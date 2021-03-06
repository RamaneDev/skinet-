import { BreadcrumbModule } from 'xng-breadcrumb';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SharedModule } from '../shared/shared.module';
import { NotAutorizedComponent } from './not-autorized/not-autorized.component';



@NgModule({
  declarations: [NavBarComponent, 
                 TestErrorComponent, 
                 NotFoundComponent, 
                 ServerErrorComponent, 
                 SectionHeaderComponent, NotAutorizedComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
   
  ],
  exports:[NavBarComponent, SectionHeaderComponent]
})
export class CoreModule { }
