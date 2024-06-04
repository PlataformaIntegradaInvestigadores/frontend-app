import {Injectable} from '@angular/core';
import {ForceDirectedGraph, Link, Node} from './models';
import * as d3 from 'd3';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
  constructor() {
  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement: HTMLElement, containerElement: any) {
    let svg, container: d3.Selection<any, unknown, null, undefined>, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    function zoomed(e: any) {
      const transform = e.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    }

    zoom = d3.zoom().on('zoom', zoomed);
    // @ts-ignore
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableNodeBehaviour(element: any, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    function started(e: any) {
      /** Preventing propagation of dragstart to parent elements */
      e.sourceEvent.stopPropagation();

      if (!e.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      e.on('drag', dragged).on('end', ended);

      function dragged(e: any) {
        node.fx = e.x;
        node.fy = e.y;
      }

      function ended(e: any) {
        if (!e.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag()
      .on('start', started));
  }

  applyDraggableBehavior(element: any) {
    const drag = d3.drag()
      .on('start', (event: any) => {
        // Lógica al iniciar el arrastre
      })
      .on('drag', (event: any) => {
        // Lógica durante el arrastre
        d3.select(event.sourceEvent.target)
          .attr('x', event.x)
          .attr('y', event.y);
      })
      .on('end', (event: any) => {
        // Lógica al finalizar el arrastre
      });

    d3.select(element).call(drag);
  }

  /** The interactable graph we will simulate in this article
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: {
    width: number;
    height: number
  }, forces: { manyBody: number; collide: number }) {
    return new ForceDirectedGraph(nodes, links, options, forces);
  }
}
