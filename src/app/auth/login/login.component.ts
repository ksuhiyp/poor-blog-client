import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .login({ username: 'suhayb', password: 'test' })
      .pipe(tap(() => console.log(23)))
      .subscribe();
  }
}
