import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {


  onAddmode = false;

  empty_pfdetails=  {
    pfPortfolioname: null,
    pfPurpose: null,
    pfBeneUsers: null,
    pfStartDt: null,
    pfTargetDt: null,
    pfTargetIntRate: null,
    pfPlannedInvAmt: 0,
    pfStkAmtsplittype: null,
    pfSummed:null,
    pfStocklists: [
      {
        pfstExchange: "",
        pfstTradingsymbl: "",
        pfstLtp: "",
        pfstAmt: 0,
        pfstPercent: 0,
        pfstAllotedAmt: 0,
        pfstTotUnit: 0
      }
    ]
  };

  //This should come from a service
    pfdetails=[];
  /*
    pfdetails=  [{
    pfPortfolioname: "Natrayan",
    pfPurpose: null,
    pfBeneUsers: null,
    pfStartDt: null,
    pfTargetDt: null,
    pfTargetIntRate: null,
    pfPlannedInvAmt: 10000,
    pfStkAmtsplittype: null,
    pfSummed:null,
    pfStocklists: [
      {
        pfstExchange: "",
        pfstTradingsymbl: "ITC",
        pfstLtp: "",
        pfstAmt: 0,
        pfstPercent: 0,
        pfstAllotedAmt: 0,
        pfstTotUnit: 0
      },
      {
        pfstExchange: "",
        pfstTradingsymbl: "SBIN",
        pfstLtp: "",
        pfstAmt: 0,
        pfstPercent: 0,
        pfstAllotedAmt: 0,
        pfstTotUnit: 0
      }
    ]
  },
  {
    pfPortfolioname: "arun",
    pfPurpose: null,
    pfBeneUsers: null,
    pfStartDt: null,
    pfTargetDt: null,
    pfTargetIntRate: null,
    pfPlannedInvAmt: null,
    pfStkAmtsplittype: null,
    pfSummed:null,
    pfStocklists: [
      {
        pfstExchange: "",
        pfstTradingsymbl: "",
        pfstLtp: "",
        pfstAmt: 0,
        pfstPercent: 0,
        pfstAllotedAmt: 0,
        pfstTotUnit: 0
      }
    ]
  }];
  
  */

  constructor(private router: Router) { }

  ngOnInit() {
    
    console.log(JSON.stringify(this.pfdetails));
  }


addNewPortfolio(){
 

    this.pfdetails.unshift(this.empty_pfdetails);

  this.onAddmode=!this.onAddmode;
}

cardacancel(){
  this.pfdetails.unshift(this.empty_pfdetails);
  this.CanceladdNewPortfolio();
  this.onAddmode=!this.onAddmode;
}

cardasave(pfformobj){
  this.onAddmode=!this.onAddmode;
  console.log("save card");
  console.log(pfformobj.value);
  this.pfdetails.unshift(pfformobj.value);


}

CanceladdNewPortfolio(){
  
  this.pfdetails.shift();
  this.onAddmode=!this.onAddmode;
  
}

}
