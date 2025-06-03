import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteEaseMainComponent } from './noteease-main.component';

@NgModule({
  declarations: [NoteEaseMainComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NoteEaseMainComponent]
})
export class NoteEaseMainModule {}
