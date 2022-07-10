import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User, HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'action'];

  constructor(
    private userService: HomeService,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => this.usersList = users);
  }

  openMyProfile() {
    console.log('openMyProfile');
  }

  logout() {
    this.authService.logout().subscribe(response => {
      window.localStorage.setItem('token', '');
      this.router.navigate(['/login']);
    })
  }

  deleteUser(id: number) {
    // this.userService.deleteUser(id)
    //   .subscribe(response => {
    //     this.usersList = this.usersList.filter(user => user.id !== response.id);

    //   });
  }

  addUser() {
    // this.userService.addUser({ name: `Test${this.usersList.length}`, email: `test${this.usersList.length}@mail.com` })
    //   .subscribe(response => {
    //     this.usersList = [...this.usersList, ...response];
    //   });
  }

}
