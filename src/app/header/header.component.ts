import { Component, OnInit } from '@angular/core';
import { CompleteService } from '../services/complete.service';
import { LocalstorageService } from '../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:any;
  user:any;

  constructor(private completeService:CompleteService, private localStorageService:LocalstorageService, private router:Router) { }

  ngOnInit() {
    this.username = this.localStorageService.getUser();
    this.getProfile();
  }

  getProfile(){
    this.completeService.getProfile().subscribe((res)=>{
      this.user = res['user'];
    })
  }

  logout() {
    this.completeService.getLogout().subscribe((res) => {
      if (res['success']) {
        this.localStorageService.clearAll();
        console.log('Successfully logged out');
        this.router.navigate(['/login']);
      }
    })
  }

}
