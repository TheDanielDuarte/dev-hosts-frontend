import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [MatSidenavModule, MatListModule],
  declarations: []
})
export class MaterialModule { }
