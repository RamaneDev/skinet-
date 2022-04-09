import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  ngOnInit(): void {
  }


  notFound404() {
    this.http.get(this.baseUrl + 'Buggy/notfound').subscribe({
      next : (response) => console.log(response),
      error : (error) => console.log(error)
    })
  }

  serverError500() {
    this.http.get(this.baseUrl + 'Buggy/servererror').subscribe({
      next : (response) => console.log(response),
      error : (error) => console.log(error)
    })
  }


  badRequest400() {
    this.http.get(this.baseUrl + 'Buggy/badrequest').subscribe({
      next : (response) => console.log(response),
      error : (error) => console.log(error)
    })
  }



}
