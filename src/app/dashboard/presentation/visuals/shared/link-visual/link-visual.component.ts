import {Component, Input} from '@angular/core';
import {Link} from "../../../../../shared/d3";


@Component({
  selector: '[linkVisual]',
  template: `
    <ng-template #popTitle>Arista</ng-template>

    <ng-template #popContent>
      <b>Fuerza de colaboración:</b> {{ link.strokeWidth / 5 }}
    </ng-template>

    <svg:line class="line"
              style="stroke-width:{{link.strokeWidth}}; stroke: rgb(0, 0, 0)"
              [attr.x1]="link.source.x"
              [attr.y1]="link.source.y"
              [attr.x2]="link.target.x"
              [attr.y2]="link.target.y"

              triggers="manual"
              container="body"
    ></svg:line>
  `,
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent {
  @Input('linkVisual') link!: Link;

  togglePopover(popover: any) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
