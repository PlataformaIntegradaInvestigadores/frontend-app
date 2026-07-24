import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';

import {faDownload, faVectorSquare} from '@fortawesome/free-solid-svg-icons';
import {DOCUMENT} from '@angular/common';
import {
  Author,
  AuthorNode,
} from '../../../../../shared/interfaces/author.interface';
import {Node, Link} from '../../../../../shared/d3';
import {AuthorService} from '../../../../domain/services/author.service';
import * as htmlToImage from 'html-to-image';
import * as d3 from 'd3';

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
  loading: boolean = false;

  @ViewChild('downloadEl') downloadEl!: ElementRef;
  faDownload = faDownload;
  faVectorSquare = faVectorSquare;

  // Seleccion de zona para exportar solo una parte del grafo
  selectingRegion = false;
  regionStart: { x: number, y: number } | null = null;
  regionRect: { x: number, y: number, w: number, h: number } | null = null;

  constructor(
    private authorService: AuthorService,
    @Inject(DOCUMENT) private coreDoc: Document
  ) {
    this.d3Links = [];
    this.d3Nodes = [];
  }

  ngOnInit() {
    this.loading = true;
    this.authorService
      .getCoauthorsById(this.author.scopus_id)
      .subscribe({
        next: coauthors => {
          this.apiNodes = coauthors.data.nodes || [];
          // Si el autor no tiene coautores reales solo quedaria su propio nodo
          // suelto; en ese caso mostramos un mensaje en vez de un grafo vacio.
          const hasCoauthors = this.apiNodes.length > 0;
          this.apiNodes.push({
            scopus_id: parseInt(String(this.author.scopus_id)),
            initials: this.author.initials,
            first_name: this.author.first_name,
            last_name: this.author.last_name,
            weight: 0,
          });
          this.setupNodes();
          this.setupLinks(coauthors.data.links);
          this.showGraph = hasCoauthors;
          this.loading = false;
        },
        error: () => {
          this.showGraph = false;
          this.loading = false;
        }
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
    // Encaja el grafo completo (fit-to-content) y captura el <svg> a alta resolucion,
    // para que la imagen salga centrada y con etiquetas legibles (mejora portada del
    // grafo de Relevant Authors).
    this.fitGraphToView(350);
    setTimeout(() => {
      const svgEl = this.downloadEl.nativeElement.querySelector('graph svg') as HTMLElement | null;
      const target = svgEl ?? this.downloadEl.nativeElement;
      htmlToImage.toPng(target, {pixelRatio: 3, backgroundColor: '#ffffff'}).then((dataUrl) => {
        this.downloadDataUrl(dataUrl, `coauthor-graph-${this.author.scopus_id}`);
      });
    }, 450);
  }

  private getSvgAndZoom() {
    if (!this.downloadEl) return null;
    const svgEl = this.downloadEl.nativeElement.querySelector('graph svg');
    if (!svgEl) return null;
    return {svg: d3.select(svgEl), zoom: (svgEl as any).__zoomBehavior, svgEl};
  }

  /** Mide el bounding box real del grafo y ajusta zoom+pan para que entre completo y centrado. */
  private fitGraphToView(durationMs: number): void {
    const data = this.getSvgAndZoom();
    if (!data || !data.zoom) return;
    const container = data.svgEl.querySelector('g.my-border') as SVGGraphicsElement | null;
    if (!container) return;
    const bbox = container.getBBox();
    if (!bbox.width || !bbox.height) return;
    const vw = data.svgEl.clientWidth || 800;
    const vh = data.svgEl.clientHeight || 600;
    const scale = Math.min(Math.min(vw / bbox.width, vh / bbox.height) * 0.9, 1.5);
    const tx = vw / 2 - scale * (bbox.x + bbox.width / 2);
    const ty = vh / 2 - scale * (bbox.y + bbox.height / 2);
    data.svg.transition().duration(durationMs).call(
      data.zoom.transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
    );
  }

  // --- Seleccion de zona: arrastrar un rectangulo sobre el grafo y exportar solo ese recorte ---
  toggleRegionSelect(): void {
    this.selectingRegion = !this.selectingRegion;
    this.regionStart = null;
    this.regionRect = null;
  }

  private regionCoords(e: MouseEvent): { x: number, y: number } {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  onRegionMouseDown(e: MouseEvent): void {
    const p = this.regionCoords(e);
    this.regionStart = p;
    this.regionRect = { x: p.x, y: p.y, w: 0, h: 0 };
  }

  onRegionMouseMove(e: MouseEvent): void {
    if (!this.regionStart) return;
    const p = this.regionCoords(e);
    this.regionRect = {
      x: Math.min(this.regionStart.x, p.x),
      y: Math.min(this.regionStart.y, p.y),
      w: Math.abs(p.x - this.regionStart.x),
      h: Math.abs(p.y - this.regionStart.y),
    };
  }

  onRegionMouseUp(): void {
    if (this.regionRect && this.regionRect.w > 5 && this.regionRect.h > 5) {
      this.exportRegion(this.regionRect);
      this.selectingRegion = false;
    }
    this.regionStart = null;
    this.regionRect = null;
  }

  /** Exporta solo el rectangulo seleccionado (en coords del viewport del grafo) en alta resolucion. */
  private exportRegion(rect: { x: number, y: number, w: number, h: number }): void {
    const svgEl = this.downloadEl.nativeElement.querySelector('graph svg') as HTMLElement | null;
    if (!svgEl) return;
    const PR = 3; // pixelRatio: alta resolucion para que las etiquetas se lean
    htmlToImage.toPng(svgEl, { pixelRatio: PR, backgroundColor: '#ffffff' }).then(dataUrl => {
      const img = new Image();
      img.onload = () => {
        const canvas = this.coreDoc.createElement('canvas');
        canvas.width = Math.max(1, Math.round(rect.w * PR));
        canvas.height = Math.max(1, Math.round(rect.h * PR));
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, rect.x * PR, rect.y * PR, rect.w * PR, rect.h * PR, 0, 0, canvas.width, canvas.height);
        this.downloadDataUrl(canvas.toDataURL('image/png'), `grafo-zona-${this.author.scopus_id}`);
      };
      img.src = dataUrl;
    });
  }

  // --- Controles de zoom ---
  zoomIn(): void {
    const data = this.getSvgAndZoom();
    if (data && data.zoom) {
      data.svg.transition().duration(300).call(data.zoom.scaleBy, 1.3);
    }
  }

  zoomOut(): void {
    const data = this.getSvgAndZoom();
    if (data && data.zoom) {
      data.svg.transition().duration(300).call(data.zoom.scaleBy, 0.7);
    }
  }

  resetZoom(): void {
    const data = this.getSvgAndZoom();
    if (data && data.zoom) {
      const width = data.svgEl.clientWidth || 800;
      const height = data.svgEl.clientHeight || 600;
      data.svg.transition().duration(750).call(
        data.zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.3).translate(-width / 2, -height / 2)
      );
    }
  }
}
