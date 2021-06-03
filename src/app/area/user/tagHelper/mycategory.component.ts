import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mycategory',
  templateUrl: './mycategory.component.html',
  
})
export class MyCategoryComponent implements OnInit {

    categories : CategoryModel[] 
    constructor(private userService: UserService) {

    }
  ngOnInit(){
    this.userService.getAllCategory().then(
        res => {
          this.categories = res
        },
        err => {
          console.log(err)
        }
      );
  }
  loadcategory(){

  }
  
}
