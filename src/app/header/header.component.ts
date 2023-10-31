import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
  })
  
  export class HeaderComponent {

    constructor(private dataStorageSrvc: DataStorageService){}

    onFetchData(){
      this.dataStorageSrvc.fetchRecipes().subscribe();
    }

    onSaveData(){
      this.dataStorageSrvc.storeRecipes();
    }
  }