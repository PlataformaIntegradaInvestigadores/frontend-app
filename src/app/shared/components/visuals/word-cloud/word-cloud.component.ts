import {Component, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent {
  private words: { text: string, size: number }[] = [
    { text: 'Data Mining', size: 50 },
    { text: 'Machine Learning', size: 70 },
    { text: 'Deep Learning', size: 65 },
    { text: 'Artificial Intelligence', size: 80 },
    { text: 'Big Data', size: 55 },
    { text: 'Natural Language Processing', size: 60 },
    { text: 'Computer Vision', size: 75 },
    { text: 'Bioinformatics', size: 50 },
    { text: 'Cybersecurity', size: 70 },
    { text: 'Quantum Computing', size: 85 },
    { text: 'Blockchain Technology', size: 55 },
    { text: 'Internet of Things (IoT)', size: 60 },
    { text: 'Genomics', size: 65 },
    { text: 'Renewable Energy', size: 70 },
    { text: 'Epidemiology', size: 75 },
    { text: 'Climate Change', size: 80 },
    { text: 'Neuroscience', size: 85 },
    { text: 'Robotics', size: 90 },
    { text: 'Human-Computer Interaction', size: 55 },
    { text: 'Cognitive Science', size: 60 },
    { text: 'Autonomous Vehicles', size: 65 },
    { text: 'Digital Health', size: 50 },
    { text: 'Smart Cities', size: 55 },
    { text: 'Wearable Technology', size: 60 },
    { text: 'Augmented Reality', size: 75 },
    { text: 'Virtual Reality', size: 80 },
    { text: '5G Technology', size: 85 },
    { text: 'Edge Computing', size: 50 },
    { text: 'Cloud Computing', size: 55 },
    { text: 'Nano-technology', size: 60 },
    { text: 'Astrobiology', size: 65 },
    { text: 'Space Exploration', size: 70 },
    { text: 'Marine Biology', size: 75 },
    { text: 'Astrophysics', size: 80 },
    { text: 'Materials Science', size: 85 },
    { text: 'Bioengineering', size: 90 },
    { text: 'Nuclear Physics', size: 55 },
    { text: 'Particle Physics', size: 60 },
    { text: 'Thermodynamics', size: 65 },
    { text: 'Fluid Dynamics', size: 70 },
    { text: 'Electromagnetism', size: 75 },
    { text: 'Optics', size: 80 },
    { text: 'Quantum Mechanics', size: 85 },
    { text: 'String Theory', size: 50 },
    { text: 'Biochemistry', size: 55 },
    { text: 'Microbiology', size: 60 },
    { text: 'Virology', size: 65 },
    { text: 'Immunology', size: 70 },
    { text: 'Pharmacology', size: 75 },
    { text: 'Toxicology', size: 80 },
    { text: 'Psychology', size: 85 },
    { text: 'Sociology', size: 90 },
    { text: 'Anthropology', size: 55 },
    { text: 'Archaeology', size: 60 },
    { text: 'Linguistics', size: 65 },
    { text: 'Political Science', size: 70 },
    { text: 'Economics', size: 175 },
    { text: 'Law', size: 80 },
    { text: 'Philosophy', size: 185 },
    { text: 'Ethics', size: 90 },
    { text: 'Education', size: 155 },
    { text: 'Public Health', size: 60 },
    { text: 'Agricultural Science', size: 65 },
    { text: 'Food Science', size: 70 },
    { text: 'Forestry', size: 75 },
    { text: 'Environmental Science', size: 80 },
    { text: 'Geology', size: 85 },
    { text: 'Meteorology', size: 50 },
    { text: 'Oceanography', size: 55 },
    { text: 'Seismology', size: 60 },
    { text: 'Volcanology', size: 65 },
    { text: 'Paleontology', size: 7 },
    { text: 'Zoology', size: 75 },
    { text: 'Botany', size: 80 },
    { text: 'Horticulture', size: 85 },
    { text: 'Entomology', size: 90 },
    { text: 'Ornithology', size: 55 },
    { text: 'Herpetology', size: 60 },
    { text: 'Ichthyology', size: 65 },
    { text: 'Huma', size: 70 },
    { text: 'Primatology', size: 75 },
    { text: 'Ecology', size: 80 },
    { text: 'Conservation Biology', size: 85 },
    { text: 'Evolutionary Biology', size: 50 },
    { text: 'Developmental Biology', size: 55 },
    { text: 'Cell Biology', size: 60 },
    { text: 'Molecular Biology', size: 65 },
    { text: 'Structural Biology', size: 70 },
    { text: 'Systems Biology', size: 75 },
    { text: 'Synthetic Biology', size: 80 },
    { text: 'Computational Biology', size: 85 },
    { text: 'Theoretical Biology', size: 90 },
    { text: 'Biophysics', size: 55 },
    { text: 'Biomechanics', size: 60 }
  ];

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.generateWordCloud();
  }

  private generateWordCloud(): void {
    const layout = cloud()
      .size([700, 300])
      .words(this.words.map(d => ({ text: d.text, size: d.size })))
      .padding(2)
      .font('Impact')
      .rotate(0)
      .fontSize(d => (d.size || 10)/4)
      .on('end', words => this.draw(words));

    layout.start();
  }

  private draw(words: any[]): void {
    d3.select(this.el.nativeElement).select('svg').remove();

    const svg = d3.select(this.el.nativeElement).append('svg')
      .attr('width', 600)
      .attr('height', 400)
      .append('g')
      .attr('transform', 'translate(320,200)');

    svg.selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Impact')
      .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text);
  }
}
