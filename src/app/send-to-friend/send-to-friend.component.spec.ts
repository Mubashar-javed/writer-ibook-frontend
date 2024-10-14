import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToFriendComponent } from './send-to-friend.component';

describe('SendToFriendComponent', () => {
  let component: SendToFriendComponent;
  let fixture: ComponentFixture<SendToFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToFriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendToFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
