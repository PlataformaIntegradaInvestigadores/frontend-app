import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Author, AuthorNode} from "../../../../../shared/interfaces/author.interface";
import {Link,Node} from "../../../../../shared/d3";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

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


  constructor() {
  }

  ngOnInit() {

  }

  setupNodes() {
    this.apiNodes.forEach(node => {
      this.d3Nodes.push()
    })
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

  }

  protected readonly faDownload = faDownload;
}
