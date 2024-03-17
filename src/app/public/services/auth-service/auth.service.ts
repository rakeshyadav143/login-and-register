import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../interfaces';

export const fakeLoginResponse: LoginResponse = {
  status: 200,
  message: 'Login sucessfull.'
}

export const fakeRegisterResponse: RegisterResponse = {
  status: 201,
  message: 'Registration sucessfull.'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {

    let users = localStorage.getItem("users");
    let loginUser;
    if(users) {
      let userArr = JSON.parse(users);
      loginUser = userArr.find((user: any) => user.username === loginRequest.username && user.password === loginRequest.password)
    }



    if(loginUser) {
      let loginUserLog = localStorage.getItem("loginUserLog");
      let userLog = [];
      let logInTime = new Date();
      if(!loginUserLog) {
        userLog.push({
          'username': loginRequest.username,
          'loginTime': logInTime,
          'logoutTime': null
        });
      } else {
        userLog.push(...JSON.parse(loginUserLog))
        userLog.push({
          'username': loginRequest.username,
          'loginTime': logInTime,
          'logoutTime': null
        });
      }

      localStorage.setItem('loginUserLog', JSON.stringify(userLog))
      localStorage.setItem('loginTime', JSON.stringify(logInTime))
      return of(fakeLoginResponse).pipe(
        tap((res: LoginResponse) => localStorage.setItem('username', loginRequest.username)),
        tap(() => this.snackbar.open('Login Successfull', 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        }))
      );
    }
    else {
      return of(fakeLoginResponse).pipe(
        tap(() => this.snackbar.open('Invalid Credentials', 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        }))
      );
    }
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    
    let users = localStorage.getItem("users");
    let user = [];
    if(!users) {
      user.push({...registerRequest});
    } else {
      user.push(...JSON.parse(users))
      user.push({
        ...registerRequest
      });
    }

    localStorage.setItem("users", JSON.stringify(user));


    return of(fakeRegisterResponse).pipe(
      tap((res: RegisterResponse) => this.snackbar.open(`User created successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
    );
  }

  getLoggedInUser() {
  }
}
