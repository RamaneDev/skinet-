import { IPagination } from './shared/models/IPagination';
import { IProduct } from './shared/models/IProduct';
import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  
  title = 'Skinet';

  products : IProduct[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IPagination>('https://localhost:5001/api/products?pageSize=3').subscribe((next : IPagination) => {      
        this.products = next.data;
        console.log(next), error => {
        console.log(error)
      }     
    });
  }
}




