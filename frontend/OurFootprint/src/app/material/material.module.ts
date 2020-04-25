
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Browser animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Components
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class MaterialModule {}
