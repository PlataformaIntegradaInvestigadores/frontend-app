import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { bind } from 'angular';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit, AfterViewInit {
  @ViewChild('svg') svgElement!: ElementRef<SVGElement>;
  @Input()
  width = 270; // Asumiendo un ancho fijo para el SVG
  @Input()
  height = 400; // Asumiendo una altura fija para el SVG

  @Output()
  eventEmitter:EventEmitter<string> = new EventEmitter();

  private words: { text: string, size: number }[] = [
    {text: 'Data Mining', size: 50},
    {text: 'Machine Learning', size: 70},
    {text: 'Deep Learning', size: 65},
    {text: 'Artificial Intelligence', size: 80},
    {text: 'Big Data', size: 55},
    {text: 'Natural Language Processing', size: 60},
    {text: 'Computer Vision', size: 75},
    {text: 'Bioinformatics', size: 50},
    {text: 'Cybersecurity', size: 70},
    {text: 'Quantum Computing', size: 85},
    {text: 'Blockchain Technology', size: 55},
    {text: 'Internet of Things (IoT)', size: 60},
    {text: 'Genomics', size: 65},
    {text: 'Renewable Energy', size: 70},
    {text: 'Epidemiology', size: 75},
    {text: 'Climate Change', size: 80},
    {text: 'Neuroscience', size: 85},
    {text: 'Robotics', size: 90},
    {text: 'Human-Computer Interaction', size: 55},
    {text: 'Cognitive Science', size: 60},
    {text: 'Autonomous Vehicles', size: 65},
    {text: 'Digital Health', size: 50},
    {text: 'Smart Cities', size: 55},
    {text: 'Wearable Technology', size: 60},
    {text: 'Augmented Reality', size: 75},
    {text: 'Virtual Reality', size: 80},
    {text: '5G Technology', size: 85},
    {text: 'Edge Computing', size: 50},
    {text: 'Cloud Computing', size: 55},
    {text: 'Nano-technology', size: 60},
    {text: 'Astrobiology', size: 65},
    {text: 'Space Exploration', size: 70},
    {text: 'Marine Biology', size: 75},
    {text: 'Astrophysics', size: 80},
    {text: 'Materials Science', size: 85},
    {text: 'Bioengineering', size: 90},
    {text: 'Nuclear Physics', size: 55},
    {text: 'Particle Physics', size: 60},
    {text: 'Thermodynamics', size: 65},
    {text: 'Fluid Dynamics', size: 70},
    {text: 'Electromagnetism', size: 75},
    {text: 'Optics', size: 80},
    {text: 'Quantum Mechanics', size: 85},
    {text: 'String Theory', size: 50},
    {text: 'Biochemistry', size: 55},
    {text: 'Microbiology', size: 60},
    {text: 'Virology', size: 65},
    {text: 'Immunology', size: 70},
    {text: 'Pharmacology', size: 75},
    {text: 'Toxicology', size: 80},
    {text: 'Psychology', size: 85},
    {text: 'Sociology', size: 90},
    {text: 'Anthropology', size: 55},
    {text: 'Archaeology', size: 60},
    {text: 'Linguistics', size: 65},
    {text: 'Political Science', size: 70},
    {text: 'Economics', size: 175},
    {text: 'Law', size: 80},
    {text: 'Philosophy', size: 185},
    {text: 'Ethics', size: 90},
    {text: 'Education', size: 155},
    {text: 'Public Health', size: 60},
    {text: 'Agricultural Science', size: 65},
    {text: 'Food Science', size: 70},
    {text: 'Forestry', size: 75},
    {text: 'Environmental Science', size: 80},
    {text: 'Geology', size: 85},
    {text: 'Meteorology', size: 50},
    {text: 'Oceanography', size: 55},
    {text: 'Seismology', size: 60},
    {text: 'Volcanology', size: 65},
    {text: 'Paleontology', size: 7},
    {text: 'Zoology', size: 75},
    {text: 'Botany', size: 80},
    {text: 'Horticulture', size: 85},
    {text: 'Entomology', size: 90},
    {text: 'Ornithology', size: 55},
    {text: 'Herpetology', size: 60},
    {text: 'Ichthyology', size: 65},
    {text: 'Huma', size: 70},
    {text: 'Primatology', size: 75},
    {text: 'Ecology', size: 80},
    {text: 'Conservation Biology', size: 85},
    {text: 'Evolutionary Biology', size: 50},
    {text: 'Developmental Biology', size: 55},
    {text: 'Cell Biology', size: 60},
    {text: 'Molecular Biology', size: 65},
    {text: 'Structural Biology', size: 70},
    {text: 'Systems Biology', size: 75},
    {text: 'Synthetic Biology', size: 80},
    {text: 'Computational Biology', size: 85},
    {text: 'Theoretical Biology', size: 90},
    {text: 'Biophysics', size: 55},
    {text: 'Biomechanics', size: 60}
  ];

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.generateWordCloud();// Asegúrate de llamarlo aquí, después de que el SVG esté disponible
  }

  private generateWordCloud(): void {
    const layout = cloud()
      .size([this.width + 30, this.height - 50])
      .words(this.words.map(d => ({text: d.text, size: d.size})))
      .padding(1)
      .rotate(0)
      .fontSize(d => (d.size || 10) / 6)
      .on('end', words => this.draw(words));

    layout.start();
  }

  private draw(words: any[]): void {
    const svg = d3.select(this.svgElement.nativeElement)

    const g = svg.select('g');

    const text: any = g
      .selectAll('text')
      .data(words)
      .enter().append('text')
      .attr('draggable', '')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Impact')
      .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text)
      .call(d3.drag<SVGTextElement, any>()
        .on('start', function (event, d) {
          d3.select(this).raise().attr('stroke', 'black');
          d3.select(this).interrupt(); // Detiene cualquier animación en curso durante el arrastre
        })
        .on('drag', function (event, d) {
          d3.select(this).attr('transform', `translate(${event.x},${event.y})rotate(${d.rotate})`);
        })
        .on('end', (event, d) => {
          d3.select(event.sourceEvent.target).attr('stroke', null);
          //this.float(d3.select(event.sourceEvent.target)); // Reinicia la animación después del arrastre
        }))
      .on('click', (event, d) => this.onWordClick(d));

    //this.animateFloating(text);

  }

  // private animateFloating(textSelection: d3.Selection<SVGTextElement, any, SVGGElement, any>): void {
  //   textSelection.each(function (d) {
  //     float(d3.select(this));
  //   });
  //
  //   function float(element: d3.Selection<SVGTextElement, any, any, any>) {
  //     const randomX = Math.random() * 10 - 5;
  //     const randomY = Math.random() * 10 - 5;
  //     element.transition()
  //       .duration(2000)
  //       .ease(d3.easeSinInOut)
  //       .attr('transform', function (d) {
  //         const currentTransform = d3.select(this).attr('transform');
  //         const translate = currentTransform.match(/translate\(([^)]+)\)/);
  //         const [x, y] = translate ? translate[1].split(',').map(Number) : [d.x, d.y];
  //         return `translate(${x + randomX},${y + randomY})rotate(${d.rotate})`;
  //       })
  //       .on('end', () => float(element));
  //   }
  // }
  private animateFloating(textSelection: d3.Selection<SVGTextElement, any, SVGGElement, any>): void {
    textSelection.each((d, i, nodes) => {
      this.float(d3.select(nodes[i]));
    });
  }

  private float(element: d3.Selection<SVGTextElement, any, any, any>): void {
    const randomX = Math.random() * 3;
    const randomY = Math.random() * 3;
    element.transition()
      .duration(1000)
      .ease(d3.easeSinInOut)
      .attr('transform', function (d) {
        const currentTransform = d3.select(this).attr('transform');
        const translate = currentTransform.match(/translate\(([^)]+)\)/);
        const [x, y] = translate ? translate[1].split(',').map(Number) : [d.x, d.y];
        return `translate(${x + randomX},${y + randomY})rotate(${d.rotate})`;
      })
      .on('end', () => this.float(element));
  }

  //
  private onWordClick(word: any): void {
    this.eventEmitter.emit(word.text)
  }
}
