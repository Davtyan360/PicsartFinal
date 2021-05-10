import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    //Check our Name and Mail and  Password
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
    })
  }
  name: String;
  email: String
  password: String
  submit() { }
  subButton() {
    const body = { name: this.name, email: this.email, password: this.password };
    this.http.post('http://localhost:3000/api/users/registration', body).subscribe(
      data => {

        this.http.post<any>('http://localhost:3000/api/users/login', data).subscribe(
          data1 => {
            //console.log(data1);

            this.router.navigateByUrl(`main/${data1.id}`);
          },
          error1 => console.log(error1)
        );
      },
      error => { console.log(error); }
    );
  }
  clickFunc() {
    this.router.navigateByUrl('login');
  }
}
