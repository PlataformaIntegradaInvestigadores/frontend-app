import { NgModule } from "@angular/core";
import { CardGroupComponent } from './presentation/components/card-group/card-group.component';
import { ListGroupComponent } from './presentation/components/list-group/list-group.component';

@NgModule({
    declarations: [CardGroupComponent, ListGroupComponent],
    imports: [],
    providers: [],
    bootstrap: [],
    exports: [ListGroupComponent]
})
export class GroupModule { }