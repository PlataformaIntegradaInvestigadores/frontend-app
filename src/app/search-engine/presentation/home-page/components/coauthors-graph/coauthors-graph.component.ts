import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';

import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";
import {Author, AuthorNode} from "../../../../../shared/interfaces/author.interface";
import {Node,Link} from "../../../../../shared/d3";
import {AuthorService} from "../../../../domain/services/author.service";
import * as htmlToImage from "html-to-image";
@Component({
  selector: 'app-coauthors-graph',
  templateUrl: './coauthors-graph.component.html',
  styleUrls: ['./coauthors-graph.component.css']
})
export class CoauthorsGraphComponent {

  //@Input() author!: Author

  author:Author = {
    affiliation: "",
    authName: "",
    email: "",
    firstName: "",
    initials: "",
    lastName: "",
    name: "",
    num_articles: 0,
    scopusId: 0,
    topics: []
  }
  d3Nodes: Node[] = []
  d3Links: Link[] = []

  apiNodes1: AuthorNode[] = []

  apiNodes = [
    {
      firstName: "Lorena",
      lastName: "Recalde",
      scopusId: 57193901649,
      initials: "L."
    },
    {
      firstName: "Juan Carlos",
      lastName: "García",
      scopusId: 57760840900,
      initials: "J.C."
    },
    {
      firstName: "Fernando",
      lastName: "Pogo",
      scopusId: 57297418300,
      initials: "F."
    },
    {
      firstName: "Emanuel",
      lastName: "Muñoz",
      scopusId: 57297831900,
      initials: "E."
    },
    {
      firstName: "G.",
      lastName: "Baquerizo Neira",
      scopusId: 57222629713,
      initials: "G."
    },
    {
      firstName: "Julián Andrés Galindo",
      lastName: "Losada",
      scopusId: 57203185972,
      initials: "J.A.G."
    },
    {
      firstName: "Karina",
      lastName: "Mendoza",
      scopusId: 57202686559,
      initials: "K."
    },
    {
      firstName: "Pedro",
      lastName: "Jimenez-Pacheco",
      scopusId: 57202714657,
      initials: "P."
    },
    {
      firstName: "Carlos Montenegro",
      lastName: "Armas",
      scopusId: 57189242187,
      initials: "C.M."
    },
    {
      firstName: "Jaime",
      lastName: "Meza",
      scopusId: 56442195300,
      initials: "J."
    },
    {
      firstName: "Rosa",
      lastName: "Navarrete",
      scopusId: 56209050900,
      initials: "R."
    },
    {
      firstName: "Luis",
      lastName: "Teran",
      scopusId: 36610928700,
      initials: "L."
    }
  ];

  apiLinks: { source: number, target: number, collabStrength: number }[] = [
    {
      collabStrength: 0.3333333333333333,
      source: 57193901649,
      target: 57760840900
    },
    {
      collabStrength: 0.5,
      source: 57193901649,
      target: 57297418300
    },
    {
      collabStrength: 0.3333333333333333,
      source: 57193901649,
      target: 57297831900
    },
    {
      collabStrength: 0.8333333333333333,
      source: 57193901649,
      target: 57222629713
    },
    {
      collabStrength: 1.0,
      source: 57193901649,
      target: 57203185972
    },
    {
      collabStrength: 0.3333333333333333,
      source: 57193901649,
      target: 57202686559
    },
    {
      collabStrength: 0.3333333333333333,
      source: 57193901649,
      target: 57202714657
    },
    {
      collabStrength: 0.8333333333333333,
      source: 57193901649,
      target: 57189242187
    },
    {
      collabStrength: 2.1666666666666665,
      source: 57193901649,
      target: 56442195300
    },
    {
      collabStrength: 1.3333333333333333,
      source: 57193901649,
      target: 56209050900
    },
    {
      collabStrength: 0.5,
      source: 57193901649,
      target: 36610928700
    },
    {
      collabStrength: 0.2,
      source: 57222629713,
      target: 36610928700
    },
    {
      collabStrength: 0.3333333333333333,
      source: 57222629713,
      target: 57760840900
    },
    {
      collabStrength: 0.3333333333333333,
      source: 57202714657,
      target: 56442195300
    },
    {
      collabStrength: 0.3333333333333333,
      source: 57202714657,
      target: 57202686559
    },
    {
      collabStrength: 0.8333333333333333,
      source: 56442195300,
      target: 57297831900
    },
    {
      collabStrength: 0.9166666666666666,
      source: 56442195300,
      target: 57202686559
    },
    {
      collabStrength: 0.5,
      source: 56209050900,
      target: 57297418300
    },
    {
      collabStrength: 1.8333333333333333,
      source: 56209050900,
      target: 57189242187
    },
    {
      collabStrength: 0.8333333333333333,
      source: 36610928700,
      target: 56442195300
    }
  ];

  forces: { manyBody: number, collide: number } = {manyBody: 50, collide: 100}

  showGraph: boolean = false

  @ViewChild("downloadEl") downloadEl!: ElementRef;
  faDownload = faDownload

  constructor(
    //private authorService: AuthorService,
              @Inject(DOCUMENT) private coreDoc: Document) {
  }

  ngOnInit() {
    this.apiNodes.push({
      scopusId: this.author.scopusId,
      initials: this.author.initials,
      firstName: this.author.firstName,
      lastName: this.author.lastName,
    });
    this.setupNodes();
    this.setupLinks(this.apiLinks);
    this.showGraph = true;

    // this.authorService.getCoauthorsById(this.author.scopusId).subscribe((coauthors) => {
    //   this.apiNodes = coauthors.nodes
    //   this.apiNodes.push({
    //     scopusId: this.author.scopusId,
    //     initials: this.author.initials,
    //     firstName: this.author.firstName,
    //     lastName: this.author.lastName,
    //     weight: 0
    //   })
    //   this.setupNodes()
    //   this.setupLinks(coauthors.links)
    //   this.showGraph = true
    // })
  }

  setupNodes() {
    this.apiNodes.forEach(node => {
      this.d3Nodes.push(new Node(node.scopusId, this.apiNodes.length, this.truncarCadena(node.firstName) + " " + this.truncarCadena(node.lastName), {
        enablePopover: true,
        title: 'Autor',
        content: node.firstName && node.lastName ? `${node.firstName} ${node.lastName}` : node.lastName || '',
        link: 'author/' + node.scopusId
      }));
    });
    // this.apiNodes.forEach(node => {
    //   this.d3Nodes.push(new Node(node.scopusId, this.apiNodes.length, this.truncarCadena(node.firstName) + " " + this.truncarCadena(node.lastName), {
    //     enablePopover: true,
    //     title: 'Autor',
    //     content: node.firstName && node.lastName ? `${node.firstName} ${node.lastName}` : node.lastName || '',
    //     link: 'author/' + node.scopusId
    //   }))
    // })
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
    let a = this.coreDoc.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    this.coreDoc.body.appendChild(a); //Firefox requires link to be in body
    a.click();
    this.coreDoc.body.removeChild(a);
  }

  onDownloadGraph(): void {
    const theElement = this.downloadEl.nativeElement;
    htmlToImage.toPng(theElement).then(dataUrl => {
      this.downloadDataUrl(dataUrl, `coauthor-graph-${this.author.scopusId}`);
    });
  }

}
