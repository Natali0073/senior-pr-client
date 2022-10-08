import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { HomeService, User } from '../home.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UnsubscriberService]
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['avatar', 'name', 'action'];

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public dialogRef: MatDialogRef<UsersListComponent>,
    private chatService: HomeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers()
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((users: User[]) => this.usersList = users);
  }

  startConversation(user: User) {
    this.chatService.startConversation({ receiverId: user.id })
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((chat: any) => {
        this.router.navigate([`/chats/${chat.id}`]);
        this.dialogRef.close();
      });
  }

}