import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { Iuser } from '../../../models/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserAuthService
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      phoneNumber: this.formBuilder.array([
        new FormGroup({
          phoneNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(/^01[0125][0-9]{8}$/),
          ]),
        }),
      ]),

      address: this.formBuilder.array([
        new FormGroup({
          city: new FormControl('', [Validators.required]),
          street: new FormControl('', [Validators.required]),
          postalCode: new FormControl('', [Validators.required]),
        }),
      ]),
    });
  }
  get fullName() {
    return this.formGroup.get('fullName');
  }
  get password() {
    return this.formGroup.get('password');
  }
  get email() {
    return this.formGroup.get('email');
  }

  get phoneNumber() {
    return this.formGroup.get('phoneNumber') as FormArray;
  }

  addAddress() {
    return this.address.push(this.newAddress());
  }
  removeAddress(currentIndex: number) {
    this.address.removeAt(currentIndex);
  }

  newPhoneNumber() {
    return this.formBuilder.group({
      phoneNumber: '',
    });
  }
  addPhoneNumber() {
    this.phoneNumber.push(this.newPhoneNumber());
  }
  removePhoneNumber(currentIndex: number) {
    this.phoneNumber.removeAt(currentIndex);
  }
  get address() {
    return this.formGroup.get('address') as FormArray;
  }
  newAddress() {
    return this.formBuilder.group({
      city: '',
      street: '',
      postalCode: '',
    });
  }

  user: Iuser = {} as Iuser;
  signUp() {
    this.user.fullName = this.fullName?.value;
    this.user.email = this.email?.value;
    this.user.password = this.password?.value;
    this.user.mobileNumbers = this.phoneNumber?.value.map(
      (item: any) => item.phoneNumber
    );
    this.user.addresses = this.address?.value.map(
      (item: any) => `${item.street}, ${item.city}, ${item.postalCode}`
    );

    this.userService.signup(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
