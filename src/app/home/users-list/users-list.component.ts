import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { HomeService, User } from '../home.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
@AutoUnsubscribe
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['avatar', 'name', 'action'];

  constructor(
    public dialogRef: MatDialogRef<UsersListComponent>,
    private chatService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers()
      .subscribe((users: User[]) => this.usersList = users);
  }

  startConversation() {
    
  }

}