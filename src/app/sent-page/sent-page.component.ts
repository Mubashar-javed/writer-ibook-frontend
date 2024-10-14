// src/app/sent-page/sent-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent-page',
  templateUrl: './sent-page.component.html',
  styleUrls: ['./sent-page.component.scss']
})
export class SentPageComponent implements OnInit {
  friendData: any;

  constructor(private router: Router) {
    // Retrieve the friend data from the router state
    const navigation = this.router.getCurrentNavigation();
    this.friendData = navigation?.extras.state?.['friend'];
  }

  ngOnInit(): void {}
}
