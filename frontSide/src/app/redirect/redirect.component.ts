import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.http.get(`http://localhost:3000/${this.route.snapshot.params['userId']}`).subscribe((data: any) => document.location.href = data.url);

  }

  ngOnInit(): void {
  }

}
