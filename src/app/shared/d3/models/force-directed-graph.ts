import {EventEmitter} from "@angular/core";
import {Link} from './link';
import {Node} from './node';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 500,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation!: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];
  public forces: { manyBody: number, collide: number }

  constructor(nodes: Node[], links: Link[], options: { width: number, height: number }, forces: { manyBody: number, collide: number }) {
    this.nodes = nodes;
    this.links = links;
    this.forces = forces
    this.initSimulation(options);
  }


  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      d3.forceLink(this.links)
        .id(d => {
          // @ts-ignore
          return d['id']
        })
        .distance((d: any) => {
          const sourceR = d.source?.r || 35;
          const targetR = d.target?.r || 35;
          return sourceR + targetR + 80; // Distancia dinámica que garantiza que los nodos jamás pisen ni oculten sus aristas
        })
        .iterations(4)
    );
  }

  initSimulation(options: { width: number, height: number }) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    // Anclar firmemente el nodo central (autor principal buscado, level === 0) al centro del lienzo
    const centerX = options.width / 2;
    const centerY = options.height / 2;
    if (this.nodes && this.nodes.length > 0) {
      this.nodes.forEach(n => {
        if (n.level === 0) {
          n.fx = centerX;
          n.fy = centerY;
        }
      });
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .velocityDecay(0.45) // Damping suave para que el movimiento sea fluido y no pierda equilibrio
        .force('charge',
          d3.forceManyBody()
            .strength(() => -150) // Fuerza repulsiva suave: permite mover nodos cómodamente sin dispersar violentamente la red
        )
        .force('collide',
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => {
              // @ts-ignore
              return (d['r'] || 35) + 15; // Radio del nodo + 15px de margen limpio
            })
            .iterations(4)
        );

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
