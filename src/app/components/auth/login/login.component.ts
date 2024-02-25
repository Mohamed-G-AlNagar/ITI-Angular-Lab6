import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { ILogUser } from '../../../models/ilog-user';
import { Iuser } from '../../../models/iuser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup: FormGroup;
  users: Iuser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserAuthService
  ) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    if (this.email && this.password) {
      this.userService.getUsers().subscribe({
        next: (data: any) => {
          this.users = data;
          let isExistingUser = this.users.find(
            (existing: any) => existing.email === this.email?.value
          );
          if (isExistingUser) {
            if (
              isExistingUser.email == this.email?.value &&
              isExistingUser.password == this.password?.value
            ) {
              let loginUser = {
                email: isExistingUser.email,
                password: isExistingUser.password,
              };
              console.log(loginUser, '-----------');
              this.userService.login(loginUser).subscribe({
                next: () => {
                  this.router.navigate(['/productsAPI']);
                },
              });
            } else {
              alert('invalid email or password');
            }
          } else {
            alert('invalid email or password');
          }
        },
      });
    }
  }

  get email() {
    return this.formGroup.get('email');
  }
  get password() {
    return this.formGroup.get('password');
  }
}
