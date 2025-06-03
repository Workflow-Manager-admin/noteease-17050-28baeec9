import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteEaseMainModule } from './noteease-main/noteease-main.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteEaseMainModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
}
