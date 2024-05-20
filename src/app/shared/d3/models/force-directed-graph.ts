import {EventEmitter} from '@angular/core';
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
    );
  }

  initSimulation(options: { width: number, height: number }) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = d3.forceSimulation()
        .force('charge',
          d3.forceManyBody()
            .strength(d => {
              // @ts-ignore
              return FORCES.CHARGE * d['r'] * this.forces.manyBody
            })
        )
        .force('collide',
          d3.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => {
              // @ts-ignore
              return d['r'] + this.forces.collide
            })
            .iterations(2)
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
