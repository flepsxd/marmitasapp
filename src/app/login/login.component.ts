import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msgs: Message[] = [];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (this.loginForm.get(field).invalid &&
        this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.submitted)
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.authService.setLoggedIn(data, this.loginForm.value.email);
        },
        resp => {
          this.msgs[0] = {
            severity: 'error',
            summary: 'Erro',
            detail: resp.error.error
          };
          this.submitted = false;
        }
      );
    }
  }
}
