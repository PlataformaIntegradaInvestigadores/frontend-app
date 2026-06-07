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
        this.apiNodes = coauthors.data.nodes;
        this.apiNodes.push({
          scopus_id: parseInt(String(this.author.scopus_id)),
          initials: this.author.initials,
          first_name: this.author.first_name,
          last_name: this.author.last_name,
          weight: 0,
        });
        this.setupNodes();
        this.setupLinks(coauthors.data.links);
        this.showGraph = true;
      });
  }

  setupNodes() {
    this.apiNodes.forEach((node) => {
      const nodeId = String(node.scopus_id);
      this.d3Nodes.push(
        new Node(
          nodeId,
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
            link: 'profile/' + node.scopus_id,
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
    links: { source: string | number; target: string | number; collabStrength: number }[]
  ) {
    links.forEach((link) => {
      const sourceId = String(link.source);
      const targetId = String(link.target);
      this.d3Nodes[this.getIndexByScopusId(sourceId)].degree++;
      this.d3Nodes[this.getIndexByScopusId(targetId)].degree++;
      this.d3Links.push(
        new Link(sourceId, targetId, link.collabStrength * 5)
      );
    });
  }

  getIndexByScopusId(scopusId: string | number) {
    const lookupId = String(scopusId);
    return this.apiNodes.findIndex((node) => String(node.scopus_id) === lookupId);
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
