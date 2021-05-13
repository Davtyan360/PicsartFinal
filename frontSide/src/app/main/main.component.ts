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
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.paiginFunc();
  }
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
  min: number = 0;
  max: number = this.min + 10;
  count: number = 50;
  posts = []
  submit() { }
  subButton() {
    const body = { url: this.url };
    this.http.post<any>(`http://localhost:3000/api/${this.route.snapshot.params['id']}/longUrl`, body).subscribe(
      data => this.shortUrl = data.shortUrl,
      error => { console.log(error); }
    );
  }
  paiginFunc() {
    this.http.get(`http://localhost:3000/users/allPosts/${this.route.snapshot.params['id']}/count?page1=${this.min == 0 ? this.min : this.min / 10}&limit1=10`).subscribe((data: any) => {
      this.count = data.count;
      this.posts = data.arr;
    });
  }
  incrFunc() {
    if (!(this.min <= 0)) {
      this.min -= 10
      this.max = this.min + 10;
      this.paiginFunc();
    }
  }
  decrFunc() {
    if (this.max < this.count) {
      this.min += 10;
      this.max = this.min + 10;
      this.paiginFunc();
    }
  }
}
