// src/app/word-meaning/word-meaning.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { RapidAPIResponse } from '../book/book.interface';

@Component({
  selector: 'app-word-meaning',
  templateUrl: './word-meaning.component.html',
  styleUrls: ['./word-meaning.component.scss'],
})
export class WordMeaningComponent implements OnInit {
  @Input() wordData!: RapidAPIResponse;
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
