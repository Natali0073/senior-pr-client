import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { checkFieldValid, formErrorMessage, validateImageSize } from 'src/app/shared/utils/utils';
import { getCurrentUser } from 'src/app/state/users.actions';
import { selectCurrentUser } from 'src/app/state/users.selectors';
import { User } from '../home.service';
import { finalize } from 'rxjs/operators';
import { UserProfileComponent } from '../userProfile/user-profile.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
@AutoUnsubscribe
export class ChatsListComponent implements OnInit, AfterViewInit {
  @Input() chatsList: any[];

  displayedColumns: string[] = ['avatar', 'name', 'lastMessage', 'action'];
  preview: string = '../../assets/avatar.png';
  chatsListTable = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngAfterViewInit() {
    this.chatsListTable.paginator = this.paginator;
  }

  ngOnInit() {
    this.chatsListTable.data = this.chatsList;
  }


}