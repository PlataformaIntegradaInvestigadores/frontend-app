import {Component, ElementRef, EventEmitter, Inject, Input, Output, SimpleChanges, ViewChild} from "@angular/core";
import {Link,Node} from "../../../../../shared/d3";
import {AuthorNode, Coauthors} from "../../../../../shared/interfaces/author.interface";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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
  affiliations: { scopusId: number, name: string }[] = []
  selectedAffiliations: number[] = []

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
    console.log(this.query)
    this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber)
      .pipe(
        tap((coauthors) => {
          console.log(coauthors)
          this.affiliations = coauthors.affiliations;
          this.setupGraph(coauthors);
          this.showGraph = true;
          this.loading.emit(false);
        })
      ).subscribe();
  }

  setupGraph(coauthors: Coauthors) {

    this.apiNodes = coauthors.nodes
    console.log(this.apiNodes)
    this.d3Nodes = this.getD3Nodes()
    this.d3Links = this.getD3Links(coauthors.links)
  }

  onAuthorsNumberChange() {
    this.selectedAffiliations = []
    this.refreshGraph()
  }

  onClickCheckbox(event: any) {
    let item = Number(event.target.id)
    if (event.target.checked) {
      this.selectedAffiliations.push(item)
    } else {
      this.selectedAffiliations.splice(this.selectedAffiliations.indexOf(item), 1)
    }
  }

  onClickAffiliationsFilter(type: string) {
    this.showGraph = false
    this.loading.emit(true)
    this.authorService.getMostRelevantAuthors(this.query, this.authorsNumber, type, this.selectedAffiliations)
      .pipe(
        tap((coauthors) => {
          this.setupGraph(coauthors);
          this.showGraph = true;
          this.loading.emit(false);
        })
      ).subscribe();

  }

  getD3Nodes() {
    return this.apiNodes.map((node, index) => {
      return new Node(node.scopusId, this.apiNodes.length,this.truncarCadena(node.firstName) + " \n" + this.truncarCadena(node.lastName), {
        enablePopover: true,
        title: 'Autor',
        content: node.firstName + " " + node.lastName,
        link: 'author/' + node.scopusId
      }, this.apiNodes.length - index)
    })
  }
  truncarCadena(texto: string): string {
    const indiceEspacio = texto.indexOf(' ');
    const indiceGuion = texto.indexOf('-');
    // Verifica si hay espacio y guion
    if (indiceEspacio !== -1 && indiceGuion !== -1) {
      // Corta en el primero que aparezca
      return texto.substring(0, Math.min(indiceEspacio, indiceGuion));
    } else if (indiceEspacio !== -1) {
      // Si hay solo espacio
      return texto.substring(0, indiceEspacio);
    } else if (indiceGuion !== -1) {
      // Si hay solo guion
      return texto.substring(0, indiceGuion);
    } else {
      // Si no hay ni espacio ni guion, devuelve la cadena original
      return texto;
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
    return this.apiNodes.map(node => node.scopusId).indexOf(scopusId)
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
