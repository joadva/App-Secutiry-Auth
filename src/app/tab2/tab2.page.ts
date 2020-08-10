import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  session: any;
  user: any;
  constructor(private router: Router) {}


  ngOnInit(){
    this.session = JSON.parse(localStorage.getItem('user'));
    
   if(this.session  == null){
      this.router.navigateByUrl('/');
    }
    
    
  }

}
