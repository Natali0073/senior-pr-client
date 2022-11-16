import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { material } from '../../material/material';
import { UserVatarComponent } from '../user-avatar/user-avatar.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const initialState = {};

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        MatDialogModule,
        HttpClientTestingModule
      ],
      declarations: [ HeaderComponent, UserVatarComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
