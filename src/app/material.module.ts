import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDividerModule,
  MatProgressBarModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  declarations: []
})
export class MaterialModule { }
