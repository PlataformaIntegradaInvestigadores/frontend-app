import {Node} from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;

  strokeWidth: number

  constructor(source: Node | string | number, target: Node | string | number, strokeWidth: number) {
    // @ts-ignore
    this.source = source;

    // @ts-ignore
    this.target = target;
    this.strokeWidth = strokeWidth
  }
}
