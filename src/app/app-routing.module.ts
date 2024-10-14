import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { LoginComponent } from './login/login.component';
import { SendToFriendComponent } from './send-to-friend/send-to-friend.component';
import { SentPageComponent } from './sent-page/sent-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookListComponent },

  { path: 'edit-book', component: BookEditComponent },
  { path: 'edit-book/:id', component: BookEditComponent },
  { path: 'send-to-friend', component: SendToFriendComponent },
  { path: 'sent', component: SentPageComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/books',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
