import { Component } from '@angular/core';
import * as d3 from 'd3';
import {json} from "d3";
@Component({
  selector: 'app-ecuador-map',
  templateUrl: './ecuador-map.component.html',
  styleUrls: ['./ecuador-map.component.css']
})
export class EcuadorMapComponent {
  private svg: any;
  private margin = 50;
  private width =750 - (this.margin * 2);
  private height = 450 - (this.margin * 2);
  private scale = Math.min(this.width, this.height);
  private geoJson: any;


  constructor() { }

  private createSvg(): void {

// Definir una escala de color ord
    var projection = d3.geoMercator()
      .center([-79,-2])
      .scale(3500)
    // .rotate([0, 0]);

    let geoGenerator: any = d3.geoPath()
      .projection(projection);
    json('assets/data/ecuador.geojson')
      .then(data => {
        this.geoJson = data
        var provinces = this.geoJson.features.map((d: { properties: { dpa_despro: string; }; }) => d.properties.dpa_despro);
        var colorScale:any = d3.scaleOrdinal()
          .domain(provinces)
          .range( [
              "#E0F7FA", "#D0F0F9", "#C0E9F8", "#B0E2F7", "#A0DBF6", "#90D4F5",
              "#80CDF4", "#70C6F3", "#60BFF2", "#50B8F1", "#40B1F0", "#30AAEF",
              "#20A3EE", "#109CEC", "#0095EB", "#0088DB", "#007ACB", "#006CBB",
              "#005EAB", "#00509B", "#00428B", "#00347B", "#00266B", "#00185B"
            ]
          )
        this.svg = d3.select('figure#map')
          .append("svg")
          .attr("width", this.width + (this.margin * 2))
          .attr("height", this.height + (this.margin * 2))
          .append("g")
          .style("background-color", "lightblue")
          .selectAll('path')
          .data(this.geoJson.features)
          .join('path')
          .attr('d', geoGenerator)
          .attr("fill", (d: any, i:any) => (colorScale(i)))
          .append("title")
          .text((d: any) => d.properties.dpa_despro); // Puedes cambiar d.properties.dpa_despro por el contenido que quieras mostrar

        // Agregar evento de mouseover para mostrar el popover
        this.svg.on("mouseover", (event:any, d:any) => {
          var tooltip = d3.select("#tooltip");
          tooltip.html("<div>" + d.properties.dpa_despro + "</div>")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 15) + "px")
            .style("opacity", 1);
        })
          .on("mouseout", function() {
            var tooltip = d3.select("#tooltip");
            tooltip.style("opacity", 0);
          });
      })

  }

  ngOnInit(): void {
    this.createSvg();
  };
}
