import { Component, OnInit } from '@angular/core';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { PublicService } from 'src/app/services/publicService.service';
import { SellerService } from 'src/app/services/user/seller.service';

@Component({
  templateUrl: './seller.component.html'
})
export class SellerComponent implements OnInit {

  // Pagination 
  isFilter = false;

  currentPage: number = 0;

  newsLength: number = 0;

  newsLengthArray = Array<string>();

  newsPerPage: number = 6;

  newsPer: number = 0;

  allNewsLength: number = 0;


  sellerCount: number = 0;

  sellers: SellerProfileModel[] = [];
  constructor(
    private sellerService: SellerService,
    private publicService: PublicService,
  ) { }


  ngOnInit(): void {
    this.loadAllSeller();
    
  }

  loadAllSeller() {
    this.sellerService.getSellertId().then(
      res => {
        this.sellerCount = res;
        this.setPagination();
        this.getNewsPerPage(1);
      }, err => {
        console.log(err);
      }
    )
  }

  minusPage() {
    this.currentPage--;
    if (!this.isFilter) {
      this.getNewsPerPage(this.currentPage);
    } else {
      //this.filterNewsPerPage(this.currentPage);
    }
  }

  plusPage() {
    this.currentPage++;
    if (!this.isFilter) {
      this.getNewsPerPage(this.currentPage);
    } else {
      //this.filterNewsPerPage(this.currentPage);
    }
  }

  executeNewsPerPage(page: number) {
    this.currentPage = page;
    if (!this.isFilter) {
      this.getNewsPerPage(this.currentPage);
    } else {
      //this.filterNewsPerPage(this.currentPage);
    }
  }

  getNewsPerPage(page: number) {
    this.sellerService.getAllSeller(page).then(
      res => {
        this.sellers = res;
      },
      err => {
        alert("Connection error, please reset server and refresh this page");
      }
    )
  }

  setPagination() {
    this.newsLength = this.sellerCount;
    this.newsPer = Math.ceil(this.newsLength / this.newsPerPage);
    this.newsLengthArray = new Array(this.newsPer);
    this.currentPage = 1;
  }


  //Get Image
  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("member", imageName);
  }

  

}