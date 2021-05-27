import { Component, OnInit } from '@angular/core';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { SellerService } from 'src/app/services/user/seller.service';

@Component({
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit {

  agents: SellerProfileModel[] = [];
  constructor(
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.sellerService.loadagent().then(
      res => {
        this.agents = res
        //console.log(this.agents[0].memberId);
      },
      err => {
        console.log(err)
      });
  }

}