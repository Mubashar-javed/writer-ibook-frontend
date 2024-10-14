import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { AuthService } from '../auth/auth.service';
import { BookStatusOptions, RapidAPIResponse } from '../book/book.interface';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  publishStatusOptions = BookStatusOptions;
  bookId = 0;
  content: string = '';
  editor: Quill | undefined;
  selectedText: string = '';
  wordData!: RapidAPIResponse;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    if (this.bookId) {
      this.loadBookDetails();
    }
  }

  onEditorCreated(editor: Quill) {
    this.editor = editor;
    editor.root.addEventListener('dblclick', (event: MouseEvent) => {
      this.onEditorDoubleClick(editor);
    });

    editor.setContents(editor.clipboard.convert({ html: this.content }));
  }

  onEditorDoubleClick(editor: Quill) {
    const selection = editor.getSelection();
    if (selection && selection.length > 0) {
      this.selectedText = editor.getText(selection.index, selection.length);
    }

    if (this.selectedText) {
      this.getWordDetail();
    }
  }
  getWordDetail() {
    this.loading = true;
    this.bookService.getWordDetail(this.selectedText.trim()).subscribe({
      next: (response) => {
        this.wordData = response;
        console.log(this.wordData);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  loadBookDetails() {
    this.bookService.getBook(this.bookId || 0).subscribe({
      next: (data) => {
        this.content = data.content;
        this.bookForm.patchValue(data);

        if (this.editor)
          this.editor.setContents(
            this.editor.clipboard.convert({ html: data.content })
          );
      },
      error: (error) => {
        console.error('Error loading book details:', error);
      },
    });
  }

  get formFields() {
    return this.bookForm.controls;
  }

  onSave() {
    if (this.bookForm.invalid) return;

    if (this.bookId) {
      this.updateBook();
    } else {
      this.createBook();
    }
  }

  createBook() {
    const bookData = this.bookForm.value;
    const authorId = this.authService.getUser()?.user_id;

    this.bookService.createBook({ ...bookData, author: authorId }).subscribe({
      next: (response) => {
        this.snackBar.open('Book saved successfully!', 'Close');
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error('Error saving book', error);
        // Handle error response
      },
    });
  }

  updateBook() {
    const bookData = this.bookForm.value;
    const authorId = this.authService.getUser()?.user_id;
    const data = { ...bookData, author: authorId };

    this.bookService.updateBook(this.bookId, data).subscribe({
      next: (response) => {
        this.snackBar.open('Book updated successfully!', 'Close');
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error('Error updating book', error);
      },
    });
  }
}
