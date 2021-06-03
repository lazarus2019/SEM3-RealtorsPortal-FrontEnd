import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { PublicService } from 'src/app/services/publicService.service';
import { SellerService } from 'src/app/services/user/seller.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';
declare var alerFunction : any;

@Component({
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit {

  // Pagination 
  isFilter = false;

  currentPage: number = 0;

  newsLength: number = 0;

  newsLengthArray = Array<string>();

  newsPerPage: number = 6;

  newsPer: number = 0;

  allNewsLength: number = 0;

  formSearchAgent : FormGroup;

  //
  agentCount: number = 0;
  agents: SellerProfileModel[];
  constructor(
    private publicService: PublicService,
    private sellerService: SellerService,
    private formBuilder: FormBuilder,
    private shareFormSearchData: ShareFormService
  ) { }

  ngOnInit(): void {
    this.loadAllAgent();
    this.formSearchAgent = this.formBuilder.group({
      keyword: ['', [Validators.minLength(3)]],
      category: ['Select Category']});

    // this.sellerService.loadagent().then(
    //   res => {
    //     this.agents = res
    //     //console.log(this.agents[0].memberId);
    //   },
    //   err => {
    //     console.log(err)
    //   });
  }
  loadAllAgent() {
    this.sellerService.getAgentId().then(
      res => {
        this.agentCount = res;
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
    this.sellerService.getAllAgent(page).then(
      res => {
        this.agents = res;
      },
      err => {
        alert("Connection error, please reset server and refresh this page");
      }
    )
  }

  setPagination() {
    this.newsLength = this.agentCount;
    this.newsPer = Math.ceil(this.newsLength / this.newsPerPage);
    this.newsLengthArray = new Array(this.newsPer);
    this.currentPage = 1;
  }

  
  // searchBtn() {
  //   this.isFilter = true;
  //   this.sortFilterNews();
  //   this.filterNewsPerPage(1);
  // }
  //Get Image
  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("member", imageName);
  }

}