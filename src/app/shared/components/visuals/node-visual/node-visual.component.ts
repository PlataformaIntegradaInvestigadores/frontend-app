import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {NgbPopover,NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import {Node} from '../../../d3';

@Component({
  selector: '[nodeVisual]',
  template: `
    <ng-template #popTitle>{{node.popover.title}}</ng-template>
    <ng-template #popContent>
      <a *ngIf="node.popover.link; else elseLink" [href]="node.popover.link">
        <b>Nombre:</b> {{node.popover.content}}
      </a>
      <div><b>Grado:</b> {{node.degree}}</div>
      <ng-container *ngIf="node.weight"><b>Relevancia:</b> {{node.weight}}</ng-container>
      <ng-template #elseLink>{{node.popover.content}}</ng-template>
    </ng-template>

    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"
           [ngbPopover]="popContent"
           [popoverTitle]="popTitle"
           triggers="manual"
           #p1="ngbPopover"
           (click)="togglePopover(p1)"
           container="body">
      <svg:circle
        class="node"
        [attr.fill]="node.color"
        cx="0"
        cy="0"
        [attr.r]="node.r">
      </svg:circle>
      <svg:text
        class="node-name"
        [attr.font-size]="node.fontSize">
        {{node.label ? node.label : node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node!: Node;

  constructor(private router: Router) {
  }

  togglePopover(popover: NgbPopover) {

    if (this.node.popover.enablePopover) {
      if (popover.isOpen()) {
        popover.close();
      } else {
        popover.open();
      }
    }
  }

  navigate() {
    this.router.navigate(['author', this.node.id])
  }
}
