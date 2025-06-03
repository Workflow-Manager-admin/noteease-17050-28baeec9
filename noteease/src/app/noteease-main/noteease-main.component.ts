import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Category colors mapped to color palette (primary, accent, etc.)
const CATEGORY_COLORS: { [key: string]: string } = {
  Work: '#4A90E2',      // Primary
  Personal: '#F5A623',  // Accent
  Ideas: '#7ED957',
  Study: '#B267E6',
  Other: '#50E3C2'
};

// Note interface for structure
interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  updatedAt: Date;
}

@Component({
  selector: 'noteease-main',
  standalone: true,
  templateUrl: './noteease-main.component.html',
  styleUrls: ['./noteease-main.component.css'],
  imports: [CommonModule, FormsModule],
})
export class NoteEaseMainComponent {
  notes: Note[] = [];
  searchTerm: string = '';
  selectedNote: Note | null = null;
  showEditor: boolean = false;
  editMode: boolean = false;
  categories: string[] = Object.keys(CATEGORY_COLORS);
  editorNote: Note = this._emptyNote();

  // PUBLIC_INTERFACE
  get filteredNotes(): Note[] {
    if (!this.searchTerm.trim()) {
      return this.notes.slice().sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }
    const term = this.searchTerm.trim().toLowerCase();
    return this.notes.filter(
      note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.category.toLowerCase().includes(term)
    ).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  // PUBLIC_INTERFACE
  openNote(note: Note): void {
    this.editMode = true;
    this.selectedNote = note;
    this.editorNote = { ...note };
    this.showEditor = true;
  }

  // PUBLIC_INTERFACE
  addNote(): void {
    this.editMode = false;
    this.editorNote = this._emptyNote();
    this.showEditor = true;
  }

  // PUBLIC_INTERFACE
  saveNote(): void {
    if (this.editMode && this.selectedNote) {
      // Update existing note
      this.selectedNote.title = this.editorNote.title;
      this.selectedNote.content = this.editorNote.content;
      this.selectedNote.category = this.editorNote.category;
      this.selectedNote.updatedAt = new Date();
    } else {
      // Add new note
      const newNote: Note = {
        ...this.editorNote,
        id: this._nextId(),
        updatedAt: new Date()
      };
      this.notes.push(newNote);
    }
    this.showEditor = false;
    this.selectedNote = null;
    this.editorNote = this._emptyNote();
  }

  // PUBLIC_INTERFACE
  deleteNote(note: Note): void {
    if (window.confirm('Delete this note?')) {
      this.notes = this.notes.filter(n => n.id !== note.id);
      if (this.selectedNote && this.selectedNote.id === note.id) {
        this.showEditor = false;
        this.selectedNote = null;
        this.editorNote = this._emptyNote();
      }
    }
  }

  // PUBLIC_INTERFACE
  cancelEdit(): void {
    this.showEditor = false;
    this.selectedNote = null;
    this.editorNote = this._emptyNote();
  }

  // PUBLIC_INTERFACE
  onSearchChange(value: string) {
    this.searchTerm = value;
  }

  // Helper: Return a blank note object
  private _emptyNote(): Note {
    return {
      id: 0,
      title: '',
      content: '',
      category: this.categories[0],
      updatedAt: new Date()
    }
  }

  // Helper: Generate a next note ID
  private _nextId(): number {
    return this.notes.length ? Math.max(...this.notes.map(n => n.id)) + 1 : 1;
  }

  // PUBLIC_INTERFACE
  // Get color for a given category
  categoryColor(category: string): string {
    return CATEGORY_COLORS[category] || '#D9D9D9';
  }

  // Get a short snippet from note content
  snippet(content: string): string {
    if (!content) return '';
    return content.length > 64 ? content.slice(0, 61) + '...' : content;
  }
}
