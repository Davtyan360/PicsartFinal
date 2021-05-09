import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    //Check our Name and Mail and  Password
    this.form = new FormGroup({
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
  email: String
  password: String
  submit() { }
  subButton() {
    const body = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:3000/api/users/login', body).subscribe(
      data1 => {
        //console.log(data1);
        this.router.navigateByUrl(`main/${data1.id}`)
      },
      error1 => console.log(error1)
    );

  }
  clickFunc() {
    this.router.navigateByUrl('');
  }

}
