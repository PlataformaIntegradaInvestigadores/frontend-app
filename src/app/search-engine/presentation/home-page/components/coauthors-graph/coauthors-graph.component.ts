import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';

import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";
import {Author, AuthorNode} from "../../../../../shared/interfaces/author.interface";
import {Node,Link} from "../../../../../shared/d3";

@Component({
  selector: 'app-coauthors-graph',
  templateUrl: './coauthors-graph.component.html',
  styleUrls: ['./coauthors-graph.component.css']
})
export class CoauthorsGraphComponent {

  @Input() author!: Author

  d3Nodes: Node[] = []
  d3Links: Link[] = []

  apiNodes: AuthorNode[] = []

  forces: { manyBody: number, collide: number } = {manyBody: 50, collide: 100}

  showGraph: boolean = false

  @ViewChild("downloadEl") downloadEl!: ElementRef;
  faDownload = faDownload

  constructor() {
  }

  ngOnInit() {
  }

  setupNodes() {
    this.apiNodes.forEach(node => {
      this.d3Nodes.push(new Node(node.scopusId, this.apiNodes.length, this.truncarCadena(node.firstName) + " " + this.truncarCadena(node.lastName), {
        enablePopover: true,
        title: 'Autor',
        content: node.firstName && node.lastName ? `${node.firstName} ${node.lastName}` : node.lastName || '',
        link: 'author/' + node.scopusId
      }))
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

  setupLinks(links: { source: number, target: number, collabStrength: number }[]) {
    links.forEach(link => {
      this.d3Nodes[this.getIndexByScopusId(link.source)].degree++
      this.d3Nodes[this.getIndexByScopusId(link.target)].degree++
      this.d3Links.push(new Link(link.source, link.target, link.collabStrength * 5))
    })
  }

  getIndexByScopusId(scopusId: any) {
    return this.apiNodes.map(node => node.scopusId).indexOf(scopusId)
  }

  downloadDataUrl(dataUrl: string, filename: string): void {
  }

  onDownloadGraph(): void {
    const theElement = this.downloadEl.nativeElement;
  }
}
