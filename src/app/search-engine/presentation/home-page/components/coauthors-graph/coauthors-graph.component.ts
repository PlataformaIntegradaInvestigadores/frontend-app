import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import {
  Author,
  AuthorNode,
} from '../../../../../shared/interfaces/author.interface';
import { Node, Link } from '../../../../../shared/d3';
import { AuthorService } from '../../../../domain/services/author.service';
import * as htmlToImage from 'html-to-image';
import * as d3 from 'd3';
import { GraphComponent } from '../../../../../shared/components/visuals/graph/graph.component';

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
  expanding: boolean = false;
  expandedNodeIds: Set<string> = new Set();
  showLegend: boolean = true;

  toggleLegend() {
    this.showLegend = !this.showLegend;
  }

  notificationMessage: string | null = null;
  notificationType: 'success' | 'warning' | 'error' | 'info' = 'info';
  private notificationTimer: any = null;

  showNotification(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }
    this.notificationTimer = setTimeout(() => {
      this.notificationMessage = null;
    }, 3200);
  }

  @ViewChild('downloadEl') downloadEl!: ElementRef;
  @ViewChild('graphRef') graphComponent!: GraphComponent;
  faDownload = faDownload;

  selectedNode: {
    author: AuthorNode;
    degree: number;
    collaborators: { id: string; name: string; strength: number }[];
  } | null = null;
  showAllCollaborators: boolean = false;

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
        error: error => {
          console.error(error);
          this.loading = false;
        },
      });
  }

  getIndexByScopusId(id: string | number) {
    return this.d3Nodes.findIndex((node) => String(node.id) === String(id));
  }

  setupNodes() {
    this.apiNodes.forEach((node) => {
      const nodeId = String(node.scopus_id);
      const isRoot = nodeId === String(this.author.scopus_id);
      const nodeLevel = isRoot ? 0 : 1;
      this.d3Nodes.push(
        new Node(
          node.scopus_id,
          this.apiNodes.length,
          this.truncarCadena(node.first_name) +
          ' ' +
          this.truncarCadena(node.last_name),
          {
            enablePopover: false,
            title: 'Autor',
            content:
              node.first_name && node.last_name
                ? `${node.first_name} ${node.last_name}`
                : node.last_name || '',
            link: 'profile/' + node.scopus_id,
            expandable: true,
            onExpand: () => this.expandGraph(nodeId),
            onSelect: () => this.selectNode(nodeId),
          },
          undefined,
          undefined,
          nodeLevel
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
      this.d3Nodes[this.getIndexByScopusId(link.source)].degree++;
      this.d3Nodes[this.getIndexByScopusId(link.target)].degree++;
      this.d3Links.push(
        new Link(link.source, link.target, link.collabStrength * 5)
      );
    });
  }

  selectNode(id: string | number, preserveShowAll: boolean = false) {
    if (this.selectingRegion) return; // Si esta en modo seleccion de zona no seleccionar nodos
    const idStr = String(id);
    const targetNode = this.d3Nodes.find(n => String(n.id) === idStr);
    const targetApiNode = this.apiNodes.find(n => String(n.scopus_id) === idStr);

    if (targetNode && targetApiNode) {
      const collaborators: { id: string; name: string; strength: number }[] = [];
      this.d3Links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? String((link.source as any).id) : String(link.source);
        const targetId = typeof link.target === 'object' ? String((link.target as any).id) : String(link.target);

        if (sourceId === idStr || targetId === idStr) {
          const collabId = sourceId === idStr ? targetId : sourceId;
          const collabNode = this.d3Nodes.find(n => String(n.id) === collabId);
          if (collabNode) {
            collaborators.push({
              id: collabId,
              name: collabNode.label,
              strength: Number((link.strokeWidth / 5).toFixed(2))
            });
          }
        }
      });

      collaborators.sort((a, b) => b.strength - a.strength);

      this.d3Nodes.forEach(n => n.isSelected = (String(n.id) === idStr));
      this.selectedNode = {
        author: targetApiNode,
        degree: targetNode.degree,
        collaborators: collaborators
      };
      if (!preserveShowAll) {
        this.showAllCollaborators = false;
      }
    }
  }

  closePanel() {
    this.selectedNode = null;
    this.d3Nodes.forEach(n => n.isSelected = false);
  }

  toggleShowAllCollaborators() {
    this.showAllCollaborators = !this.showAllCollaborators;
  }

  isNodeExpanded(scopusId: string | number): boolean {
    return this.expandedNodeIds.has(String(scopusId));
  }

  onPanelExpandNetwork() {
    if (this.selectedNode) {
      this.expandGraph(String(this.selectedNode.author.scopus_id));
    }
  }

  expandGraph(scopusId: string | number) {
    const idStr = String(scopusId);
    if (this.expandedNodeIds.has(idStr) || this.expanding) {
      return; // Evita expansión duplicada o simultánea
    }
    this.expandedNodeIds.add(idStr);
    this.expanding = true;

    this.authorService.getCoauthorsById(scopusId).subscribe({
      next: (coauthors) => {
        this.expanding = false;
        const newApiNodes: AuthorNode[] = coauthors.data.nodes || [];
        const newLinks: { source: string | number; target: string | number; collabStrength: number }[] = coauthors.data.links || [];

        const parentNode = this.d3Nodes.find(n => String(n.id) === idStr);
        const parentLevel = parentNode && parentNode.level !== undefined ? parentNode.level : 1;
        const newLevel = parentLevel + 1;

        let addedNodesCount = 0;

        // 1. Agregar nuevos nodos
        newApiNodes.forEach((node) => {
          const nodeIdStr = String(node.scopus_id);
          if (this.getIndexByScopusId(nodeIdStr) === -1) {
            addedNodesCount++;
            this.apiNodes.push(node);
            this.d3Nodes.push(
              new Node(
                nodeIdStr,
                this.apiNodes.length,
                this.truncarCadena(node.first_name) + ' ' + this.truncarCadena(node.last_name),
                {
                  enablePopover: false,
                  title: 'Autor',
                  content: node.first_name && node.last_name ? `${node.first_name} ${node.last_name}` : node.last_name || '',
                  link: 'profile/' + node.scopus_id,
                  expandable: true,
                  onExpand: () => this.expandGraph(nodeIdStr),
                  onSelect: () => this.selectNode(nodeIdStr),
                },
                undefined,
                undefined,
                newLevel
              )
            );
          }
        });

        // 2. Actualizar el totalNodes de los nodos D3
        this.d3Nodes.forEach(n => n.totalNodes = this.apiNodes.length);

        // 3. Agregar nuevas aristas sin duplicar
        newLinks.forEach((link) => {
          const sourceId = String(link.source);
          const targetId = String(link.target);

          const sourceIdx = this.getIndexByScopusId(sourceId);
          const targetIdx = this.getIndexByScopusId(targetId);

          if (sourceIdx !== -1 && targetIdx !== -1) {
            const exists = this.d3Links.some(l => {
              const lSource = typeof l.source === 'object' ? String((l.source as any).id) : String(l.source);
              const lTarget = typeof l.target === 'object' ? String((l.target as any).id) : String(l.target);
              return (lSource === sourceId && lTarget === targetId) || (lSource === targetId && lTarget === sourceId);
            });

            if (!exists) {
              this.d3Nodes[sourceIdx].degree++;
              this.d3Nodes[targetIdx].degree++;
              this.d3Links.push(
                new Link(sourceId, targetId, link.collabStrength * 5)
              );
            }
          }
        });

        if (parentNode) {
          parentNode.isExpanded = true;
          if (addedNodesCount > 0) {
            parentNode.expandStatus = 'success';
            this.showNotification(`Network expanded! Discovered ${addedNodesCount} new coauthor${addedNodesCount > 1 ? 's' : ''} in the network.`, 'success');
          } else {
            parentNode.expandStatus = 'empty';
            this.showNotification(`No new coauthors found for this author when expanding.`, 'warning');
          }
        }

        // 4. Actualizar panel lateral en vivo si el usuario lo tiene abierto mirando un autor
        if (this.selectedNode) {
          this.selectNode(this.selectedNode.author.scopus_id, true);
        }

        // 5. Actualizar simulación en el lienzo D3
        if (this.graphComponent && this.graphComponent.graph) {
          this.graphComponent.graph.initNodes();
          this.graphComponent.graph.initLinks();
          this.graphComponent.graph.simulation.alpha(0.3).restart();
          this.graphComponent.onResize(null);
        }
      },
      error: (err) => {
        this.expanding = false;
        this.expandedNodeIds.delete(idStr);
        console.error('Error expandiendo la red de coautores:', err);
        this.showNotification(`Error expanding network. Please try again later.`, 'error');
      }
    });
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
      htmlToImage.toPng(target, { pixelRatio: 3, backgroundColor: '#ffffff' }).then((dataUrl) => {
        this.downloadDataUrl(dataUrl, `coauthor-graph-${this.author.scopus_id}`);
      });
    }, 450);
  }

  private getSvgAndZoom() {
    if (!this.downloadEl) return null;
    const svgEl = this.downloadEl.nativeElement.querySelector('graph svg');
    if (!svgEl) return null;
    return { svg: d3.select(svgEl), zoom: (svgEl as any).__zoomBehavior, svgEl };
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

    // Si el panel lateral esta abierto, restamos su ancho para centrar en el espacio visible restante
    const panelWidth = this.selectedNode ? Math.min(vw * 0.45, 384) : 0;
    const effectiveVw = Math.max(300, vw - panelWidth);

    const scale = Math.min(Math.min(effectiveVw / bbox.width, vh / bbox.height) * 0.9, 1.5);
    const tx = effectiveVw / 2 - scale * (bbox.x + bbox.width / 2);
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
    this.fitGraphToView(750);
  }
}
