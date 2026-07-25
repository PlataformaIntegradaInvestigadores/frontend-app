import {Component, Input} from '@angular/core';
import {Link} from '../../../d3';
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: '[linkVisual]',
  template: `
    <ng-template #popTitle>
      <div class="d-flex justify-content-between align-items-center" style="min-width: 140px;">
        <span>Relación</span>
        <button type="button" aria-label="Close" (click)="p1.close()" style="background: none; border: none; font-size: 1.2rem; line-height: 1; padding: 0 4px; cursor: pointer; color: #666;">&times;</button>
      </div>
    </ng-template>

    <ng-template #popContent>
      <b>Fuerza de colaboración:</b> {{link.strokeWidth / 5}}
    </ng-template>

    <svg:line class="line"
              style="stroke-width:{{link.strokeWidth}}; stroke: rgb(0, 0, 0); cursor: pointer;"
              [attr.x1]="link.source.x"
              [attr.y1]="link.source.y"
              [attr.x2]="link.target.x"
              [attr.y2]="link.target.y"

              [ngbPopover]="popContent"
              [popoverTitle]="popTitle"
              triggers="manual"
              #p1="ngbPopover"
              (click)="togglePopover(p1)"
              container="body"
    ></svg:line>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link!: Link;

  togglePopover(popover: NgbPopover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
