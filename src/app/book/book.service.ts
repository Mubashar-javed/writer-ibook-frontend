import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Book,
  BookChangeRequest,
  PaginatedBooks,
  RapidAPIResponse,
} from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  allBooks() {
    const URL = environment.baseURL + '/ibook/projects/';
    return this.http.get<PaginatedBooks>(URL);
  }

  getBook(id: number) {
    const URL = environment.baseURL + `/ibook/projects/${id}/`;
    return this.http.get<Book>(URL);
  }

  createBook(book: BookChangeRequest) {
    const URL = environment.baseURL + '/ibook/projects/';
    return this.http.post<Book>(URL, book);
  }

  updateBook(id: number, book: BookChangeRequest) {
    const URL = environment.baseURL + `/ibook/projects/${id}/`;
    return this.http.put<Book>(URL, book);
  }

  getWordDetail(word: string) {
    const url = environment.baseURL + `/ibook/words/${word}/`;
    return this.http.get<RapidAPIResponse>(url);
  }
}
