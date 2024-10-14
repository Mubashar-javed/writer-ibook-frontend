import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-to-friend',
  templateUrl: './send-to-friend.component.html',
  styleUrls: ['./send-to-friend.component.scss'],
})
export class SendToFriendComponent implements OnInit {
  friendForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.friendForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.friendForm.valid) {
      const friendData = this.friendForm.value;
      this.router.navigate(['/sent'], { state: { friend: friendData } });
    }
  }
}
