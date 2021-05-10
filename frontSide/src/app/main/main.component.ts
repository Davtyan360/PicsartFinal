import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  form: FormGroup;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    //Check our Name and Mail and  Password
    this.form = new FormGroup({
      url: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    })
  }
  url: String;
  shortUrl: String;
  submit() { }
  subButton() {
    const body = { url: this.url };
    this.http.post<any>(`http://localhost:3000/api/${this.route.snapshot.params['id']}/longUrl`, body).subscribe(
      data => this.shortUrl = data.shortUrl,
      error => { console.log(error); }
    );
  }

}
