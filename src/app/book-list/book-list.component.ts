import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book/book.interface';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  totalBooks = 0;

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.loadUserBooks();
  }

  loadUserBooks() {
    this.bookService.allBooks().subscribe({
      next: (response) => {
        this.books = response.results;
        this.totalBooks = response.count;
      },
      error: (error) => {
        console.error('Error fetching user books:', error);
      },
    });
  }

  editBook(bookId: number) {
    this.router.navigate(['/edit-book', bookId]);
  }
}
