import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AccessToken } from '../access-token.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit(): void {
    // this.authService.login({ username: 'suhayb', password: 'test' });
  }
  onSubmit(){
    this.authService
      .login(this.loginForm.value)
      .subscribe();
  }
}
