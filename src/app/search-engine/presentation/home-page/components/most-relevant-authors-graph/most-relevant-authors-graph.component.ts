import {Component, ElementRef, EventEmitter, Inject, Input, Output, SimpleChanges, ViewChild} from "@angular/core";
import {Link, Node} from "../../../../../shared/d3";
import {AuthorNode, Coauthors} from "../../../../../shared/interfaces/author.interface";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";
import {AuthorService} from "../../../../domain/services/author.service";
import {catchError, EMPTY, of, tap} from "rxjs";
import * as htmlToImage from "html-to-image";
import * as d3 from 'd3';

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
  affiliations!: { scopus_id: string, name: string }[]
  selectedAffiliations: string[] = []
  noResults = false;
  isLoadingResults = false;
  isFirstLoad = true;
  isFiltering = false;

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
      this.isFirstLoad = true;
      this.noResults = false;
      this.selectedAffiliations = [];
      if (this.authorsNumber === 0) {
        this.authorsNumber = 50;
      }
      this.refreshGraph()
    }
  }

  refreshGraph() {
    this.showGraph = false
    this.loading.emit(true)
    this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber)
      .pipe(
        catchError(error => {
          console.error("Error fetching most relevant authors graph:", error);
          this.noResults = true;
          this.showGraph = true;
          this.isFirstLoad = false;
          this.isFiltering = false;
          this.d3Nodes = [];
          this.d3Links = [];
          this.loading.emit(false);
          return EMPTY;
        }),
        tap((coauthors) => {
          this.affiliations = []
          coauthors.nodes.length === 0 ? this.noResults = true : this.noResults = false;
          this.affiliations = coauthors.affiliations;
          this.setupGraph(coauthors);
          this.showGraph = true;
          this.isFirstLoad = false;
          this.isFiltering = false;
          this.loading.emit(false);
        })
      ).subscribe();
  }

  setupGraph(coauthors: Coauthors) {

    this.apiNodes = coauthors.nodes
    this.d3Nodes = this.getD3Nodes()
    this.d3Links = this.getD3Links(coauthors.links)
    
    // Zoom out initially — only if there are actual nodes to display
    if (coauthors.nodes.length > 0) {
      setTimeout(() => {
        this.resetZoom();
      }, 100);
    }
  }

  onAuthorsNumberChange() {
    console.log(this.authorsNumber);
    this.isFiltering = true;
    this.refreshGraph()
  }

  setAuthorsNumber(num: number) {
    this.authorsNumber = num;
    this.onAuthorsNumberChange();
  }

  onClickCheckbox(event: any) {

    let item = String(event.target.id)
    if (event.target.checked) {
      if (!this.selectedAffiliations.includes(item)) {
        this.selectedAffiliations.push(item)
      }
    } else {
      this.selectedAffiliations = this.selectedAffiliations.filter((id) => id !== item)
    }
    
    this.sortAffiliations()

    // console.log(this.selectedAffiliations)
    this.onClickAffiliationsFilter('include')
  }

  sortAffiliations() {
    if (this.affiliations) {
      this.affiliations.sort((a, b) => {
        const aSelected = this.selectedAffiliations.includes(a.scopus_id);
        const bSelected = this.selectedAffiliations.includes(b.scopus_id);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
      });
    }
  }

  onClickAffiliationsFilter(type: string) {
    this.showGraph = false;
    this.isFiltering = true;
    if (this.selectedAffiliations.length > 0) {
      this.loading.emit(true)
      this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber, type, this.selectedAffiliations)
        .pipe(
          catchError(error => {
            console.error("Error fetching filtered most relevant authors graph:", error);
            this.noResults = true;
            this.showGraph = true;
            this.isFirstLoad = false;
            this.isFiltering = false;
            this.d3Nodes = [];
            this.d3Links = [];
            this.loading.emit(false);
            return EMPTY;
          }),
          tap((coauthors) => {
            console.log(coauthors);
            // console.log('dentro2: '+ this.authorsNumber)
            this.setupGraph(coauthors);
            this.showGraph = true;
            this.isFirstLoad = false;
            this.isFiltering = false;
            this.loading.emit(false);
          })
        ).subscribe();
    }else{
      this.loading.emit(true)
      console.log(this.query)
      this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber)
        .pipe(
          catchError(error => {
            console.error("Error fetching most relevant authors graph:", error);
            this.noResults = true;
            this.showGraph = true;
            this.isFirstLoad = false;
            this.isFiltering = false;
            this.d3Nodes = [];
            this.d3Links = [];
            this.loading.emit(false);
            return EMPTY;
          }),
          tap((coauthors) => {
            coauthors.nodes.length === 0 ? this.noResults = true : this.noResults = false;
            // console.log('dentro2: xd'+ this.authorsNumber)
            this.affiliations = coauthors.affiliations;
            this.setupGraph(coauthors);
            this.showGraph = true;
            this.isFirstLoad = false;
            this.isFiltering = false;
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
        link: 'profile/' + node.scopus_id
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

  getD3Links(links: { source: string | number, target: string | number, collabStrength: number }[]) {
    return links.map(link => {
      this.d3Nodes[this.getIndexByScopusId(link.source)].degree++
      this.d3Nodes[this.getIndexByScopusId(link.target)].degree++
      return new Link(link.source, link.target, link.collabStrength * (4 + 1))
    })
  }

  getIndexByScopusId(scopusId: any) {
    return this.apiNodes.map(node => String(node.scopus_id)).indexOf(String(scopusId))
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

  // Zoom Controls
  private getSvgAndZoom() {
    if (!this.downloadEl) return null;
    // Note: using 'graph svg' to avoid selecting the icon's svg
    const svgEl = this.downloadEl.nativeElement.querySelector('graph svg');
    if (!svgEl) return null;
    const svg = d3.select(svgEl);
    const zoom = (svgEl as any).__zoomBehavior;
    return { svg, zoom, svgEl };
  }

  zoomIn() {
    const data = this.getSvgAndZoom();
    if (data && data.zoom) {
      data.svg.transition().duration(300).call(data.zoom.scaleBy, 1.3);
    }
  }

  zoomOut() {
    const data = this.getSvgAndZoom();
    if (data && data.zoom) {
      data.svg.transition().duration(300).call(data.zoom.scaleBy, 0.7);
    }
  }

  resetZoom() {
    const data = this.getSvgAndZoom();
    if (data && data.zoom) {
      const width = data.svgEl.clientWidth || 800;
      const height = data.svgEl.clientHeight || 600;
      data.svg.transition().duration(750).call(data.zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.3).translate(-width / 2, -height / 2));
    }
  }
}
