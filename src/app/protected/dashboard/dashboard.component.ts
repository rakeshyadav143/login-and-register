import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public loginUserLogArr: any;
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    let username = localStorage.getItem('usersname');
    let userslog = localStorage.getItem("loginUserLog");
    if(userslog) {
      let usersLogArr = JSON.parse(userslog);
      this.loginUserLogArr = usersLogArr.map(function(userLog: {
        username: string | null; loginTime: string | null; logoutTime: Date; }){
            return userLog;
      });
    }
    
  }

  logout() {
    let username = localStorage.getItem('username');
    let loginTime = localStorage.getItem('loginTime');
    let usersLogList = localStorage.getItem("loginUserLog");
    if(usersLogList) {
      let usersLogArr = JSON.parse(usersLogList);
      let usersLogModifiedArr = usersLogArr.map(function(userLog: {
         username: string | null; loginTime: string | null; logoutTime: Date; }){
        if(userLog.username === username && JSON.stringify(userLog.loginTime) == loginTime) {
          userLog['logoutTime'] = new Date()
        }
      return userLog;
    });

      localStorage.setItem('loginUserLog', JSON.stringify(usersLogModifiedArr))
    }
    this.router.navigate(['../login'])
 }

}