import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiURL;
  private readonly authChanges: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.authChanges = new BehaviorSubject<boolean>(localStorage.getItem('jwtToken') !== null);
  }

  public logIn(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login/`, { email, password })
      .pipe(
        tap((response: any) => {
          this.setLocalStorage(response.token);
          this.authChanges.next(true);
        })
      );
  }

  public logOut(): void {
    this.clearLocalStorage();
    this.authChanges.next(false);
  }

  public signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup/`, { user });
  }

  private setLocalStorage(token: string): void {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('currentRole', this.decodeJWT(token).role);
    localStorage.setItem('currentUserId', this.decodeJWT(token).userId);
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentRole');
    localStorage.removeItem('currentUserId');
  }
  public decodeJWT(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  public getAuthChanges(): BehaviorSubject<boolean> {
    return this.authChanges;
  }
}
