import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../auth/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
  })
  
  export class HeaderComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    isAuthenticated = false;

    constructor(private dataStorageSrvc: DataStorageService, private authSrvc: AuthenticationService){

    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();      
    }

    ngOnInit(): void {
      this.subscription = this.authSrvc.user.subscribe(user =>{
        this.isAuthenticated = !!user;
      });
    }

    onFetchData(){
      this.dataStorageSrvc.fetchRecipes().subscribe();
    }

    onLogOut(){
      this.authSrvc.signOut();
    }
  
    onSaveData(){
      this.dataStorageSrvc.storeRecipes();
    }
  }