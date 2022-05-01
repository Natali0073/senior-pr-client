import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'action'];

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => this.usersList = users);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(response => {
        this.usersList = this.usersList.filter(user => user.id !== response.id);

      });
  }

  addUser() {
    this.userService.addUser({ name: `Test${this.usersList.length}`, email: `test${this.usersList.length}@mail.com` })
      .subscribe(response => {
        this.usersList = [...this.usersList, ...response];
      });
  }

}
