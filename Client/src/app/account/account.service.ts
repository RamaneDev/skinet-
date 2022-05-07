import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/Address';
import { IUser } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);   
    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )

  }

  getCurrentUserValue() {
    this.currentUserSource.value;
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )   
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailExists?email=' + email);
  }

  getUserAddress(token:string) {
    let headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account/address', {headers});
  }

  updateUserAddress(address: IAddress, token:string) {
    let headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return this.http.put(this.baseUrl + 'account/address', address, {headers})
  }
  
}
