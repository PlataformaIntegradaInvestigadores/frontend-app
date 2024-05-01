import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListGroupComponent } from "./presentation/components/list-group/list-group.component";

const routes = [
    {
        path: 'my-groups',
        component: ListGroupComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupPageRoutingModule { }