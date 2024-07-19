import {Component, ElementRef, EventEmitter, Inject, Input, Output, SimpleChanges, ViewChild} from "@angular/core";
import {Link, Node} from "../../../../../shared/d3";
import {AuthorNode, Coauthors} from "../../../../../shared/interfaces/author.interface";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";
import {AuthorService} from "../../../../domain/services/author.service";
import {tap} from "rxjs";
import * as htmlToImage from "html-to-image";

@Component({
  selector: 'app-most-relevant-authors-graph',
  templateUrl: './most-relevant-authors-graph.component.html',
  styleUrls: ['./most-relevant-authors-graph.component.css']
})
export class MostRelevantAuthorsGraphComponent {

  @Input() query!: string
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()

  d3Nodes!: Node[]
  d3Links!: Link[]

  apiNodes!: AuthorNode[]

  forces: { manyBody: number, collide: number } = {manyBody: 1, collide: 50}

  showGraph: boolean = false

  authorsNumber: number = 50
  affiliations!: { scopusId: number, name: string }[]
  selectedAffiliations: number[] = []
  noResults = false;
  isLoadingResults = false;

  @ViewChild("downloadEl") downloadEl!: ElementRef;
  faDownload = faDownload

  constructor(private authorService: AuthorService,
              @Inject(DOCUMENT) private coreDoc: Document) {
  }

  ngOnInit() {
    this.refreshGraph()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['query'] && !changes['query'].firstChange) {
      this.refreshGraph()
    }
  }

  refreshGraph() {
    this.showGraph = false
    this.loading.emit(true)
    this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber)
      .pipe(
        tap((coauthors) => {
          this.affiliations = []
          coauthors.nodes.length === 0 ? this.noResults = true : this.noResults = false;
          // this.affiliations = coauthors.affiliations;
          this.setupGraph(coauthors);
          this.showGraph = true;
          this.loading.emit(false);
        })
      ).subscribe();
  }

  setupGraph(coauthors: Coauthors) {

    this.apiNodes = coauthors.nodes
    this.d3Nodes = this.getD3Nodes()
    this.d3Links = this.getD3Links(coauthors.links)
  }

  onAuthorsNumberChange() {
    this.selectedAffiliations = []
    console.log(this.authorsNumber);
    this.refreshGraph()
  }

  onClickCheckbox(event: any) {

    let item = Number(event.target.id)
    if (event.target.checked) {
      this.selectedAffiliations.push(item)
    } else {
      this.selectedAffiliations.splice(this.selectedAffiliations.indexOf(item), 1)
    }
    // console.log(this.selectedAffiliations)
    this.onClickAffiliationsFilter('include')
  }

  onClickAffiliationsFilter(type: string) {
    this.showGraph = false
    if (this.selectedAffiliations.length > 0) {
      this.loading.emit(true)
      this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber, type, this.selectedAffiliations)
        .pipe(
          tap((coauthors) => {
            console.log(coauthors);
            // console.log('dentro2: '+ this.authorsNumber)
            this.setupGraph(coauthors);
            this.showGraph = true;
            this.loading.emit(false);
          })
        ).subscribe();
    }else{
      this.loading.emit(true)
      console.log(this.query)
      this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber)
        .pipe(
          tap((coauthors) => {
            coauthors.nodes.length === 0 ? this.noResults = true : this.noResults = false;
            // console.log('dentro2: xd'+ this.authorsNumber)
            this.affiliations = coauthors.affiliations;
            this.setupGraph(coauthors);
            this.showGraph = true;
            this.loading.emit(false);
          })
        ).subscribe();
    }
  }

  getD3Nodes() {
    return this.apiNodes.map((node, index) => {
      return new Node(node.scopus_id, this.apiNodes.length, this.truncateString(node.first_name) + " \n" + this.truncateString(node.last_name), {
        enablePopover: true,
        title: 'Autor',
        content: node.first_name + " " + node.last_name,
        link: 'author/' + node.scopus_id
      }, this.apiNodes.length - index)
    })
  }

  truncateString(text: string): string {
    const spaceIndex = text.indexOf(' ');
    const dashIndex = text.indexOf('-');
    if (spaceIndex !== -1 && dashIndex !== -1) {
      return text.substring(0, Math.min(spaceIndex, dashIndex));
    } else if (spaceIndex !== -1) {
      return text.substring(0, spaceIndex);
    } else if (dashIndex !== -1) {
      return text.substring(0, dashIndex);
    } else {
      return text;
    }
  }

  getD3Links(links: { source: number, target: number, collabStrength: number }[]) {
    return links.map(link => {
      this.d3Nodes[this.getIndexByScopusId(link.source)].degree++
      this.d3Nodes[this.getIndexByScopusId(link.target)].degree++
      return new Link(link.source, link.target, link.collabStrength * (4 + 1))
    })
  }

  getIndexByScopusId(scopusId: any) {
    console.log(this.apiNodes.map(node => node.scopus_id).indexOf(scopusId))
    return this.apiNodes.map(node => node.scopus_id).indexOf(scopusId)
  }

  downloadDataUrl(dataUrl: string, filename: string): void {
    let a = this.coreDoc.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    this.coreDoc.body.appendChild(a);
    a.click();
    this.coreDoc.body.removeChild(a);
  }

  onDownloadGraph(): void {
    const theElement = this.downloadEl.nativeElement;
    htmlToImage.toPng(theElement).then(dataUrl => {
      this.downloadDataUrl(dataUrl, `most-relevant-authors-graph-${this.query}`);
    });
  }
}
