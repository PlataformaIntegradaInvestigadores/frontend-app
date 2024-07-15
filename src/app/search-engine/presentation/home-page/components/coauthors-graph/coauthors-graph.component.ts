import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';

import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {DOCUMENT} from '@angular/common';
import {
  Author,
  AuthorNode,
} from '../../../../../shared/interfaces/author.interface';
import {Node, Link} from '../../../../../shared/d3';
import {AuthorService} from '../../../../domain/services/author.service';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-coauthors-graph',
  templateUrl: './coauthors-graph.component.html',
  styleUrls: ['./coauthors-graph.component.css'],
})
export class CoauthorsGraphComponent {
  @Input() author!: Author;

  d3Nodes: Node[] = [];
  d3Links: Link[] = [];

  apiNodes: AuthorNode[] = [];


  forces: { manyBody: number; collide: number } = {
    manyBody: 50,
    collide: 100,
  };

  showGraph: boolean = false;

  @ViewChild('downloadEl') downloadEl!: ElementRef;
  faDownload = faDownload;

  constructor(
    private authorService: AuthorService,
    @Inject(DOCUMENT) private coreDoc: Document
  ) {
    this.d3Links = [];
    this.d3Nodes = [];
  }

  ngOnInit() {
    this.authorService
      .getCoauthorsById(this.author.scopus_id)
      .subscribe(coauthors => {
        console.log('dentro xd: ' + this.author.scopus_id)
        console.log(coauthors);
        this.apiNodes = coauthors.data.nodes;
        console.log('coauthors: ' + this.apiNodes)
        console.log("Verificando el tipo")
        console.log(typeof this.author.scopus_id)
        this.apiNodes.push({
          scopus_id: parseInt(String(this.author.scopus_id)),
          initials: this.author.initials,
          first_name: this.author.first_name,
          last_name: this.author.last_name,
          weight: 0,
        });
        this.setupNodes();
        console.log(coauthors.data.links);
        this.setupLinks(coauthors.data.links);
        this.showGraph = true;
      });
  }

  setupNodes() {
    this.apiNodes.forEach((node) => {
      this.d3Nodes.push(
        new Node(
          node.scopus_id,
          this.apiNodes.length,
          this.truncarCadena(node.first_name) +
          ' ' +
          this.truncarCadena(node.last_name),
          {
            enablePopover: true,
            title: 'Autor',
            content:
              node.first_name && node.last_name
                ? `${node.first_name} ${node.last_name}`
                : node.last_name || '',
            link: 'author/' + node.scopus_id,
          }
        )
      );
    });

  }

  truncarCadena(texto: string): string {
    const indiceEspacio = texto.indexOf(' ');
    const indiceGuion = texto.indexOf('-');
    if (indiceEspacio !== -1 && indiceGuion !== -1) {
      return texto.substring(0, Math.min(indiceEspacio, indiceGuion));
    } else if (indiceEspacio !== -1) {
      return texto.substring(0, indiceEspacio);
    } else if (indiceGuion !== -1) {
      return texto.substring(0, indiceGuion);
    } else {
      return texto;
    }
  }

  setupLinks(
    links: { source: number; target: number; collabStrength: number }[]
  ) {
    links.forEach((link) => {
      console.log("asasasadssa: " + link.source + '   ' + link.target + "   " + link.collabStrength);
      this.d3Nodes[this.getIndexByScopusId(link.source)].degree++;
      console.log('degreeeeeee: ' + this.d3Nodes)
      this.d3Nodes[this.getIndexByScopusId(link.target)].degree++;
      this.d3Links.push(
        new Link(link.source, link.target, link.collabStrength * 5)
      );
    });
  }

  getIndexByScopusId(scopusId: any) {
    console.log('scopus: ' + scopusId);
    console.log('index: ' + this.apiNodes.map((node) => node.scopus_id).indexOf(scopusId));
    return this.apiNodes.map((node) => node.scopus_id).indexOf(scopusId);
  }

  downloadDataUrl(dataUrl: string, filename: string): void {
    let a = this.coreDoc.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    this.coreDoc.body.appendChild(a); //Firefox requires link to be in body
    a.click();
    this.coreDoc.body.removeChild(a);
  }

  onDownloadGraph(): void {
    const theElement = this.downloadEl.nativeElement;
    htmlToImage.toPng(theElement).then((dataUrl) => {
      this.downloadDataUrl(dataUrl, `coauthor-graph-${this.author.scopus_id}`);
    });
  }
}
