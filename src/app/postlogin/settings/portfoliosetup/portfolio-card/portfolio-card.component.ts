import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {
  onEdit=false;
  public pfForm : FormGroup;

  today = new Date();
 
  freqs = ['Daily','Weekly','Fortnightly','Monthly','Quaterly','Halfyearly','Yearly','Adhoc'];
  userSchedules=[{"title":"natrayans Portfolio","description":"for my savings","location":"9.5%","timeStart":this.today,"timeEnd":this.today}];

  constructor(private pffb: FormBuilder) { 
   

}

  ngOnInit() {
    this.pfForm = this.pffb.group({ 
      pfPortfolioname:[null,Validators.required],
      pfPurpose:[null],
      pfBeneUsers:[null,Validators.required],
      pfStartDt:[null,Validators.required],
      pfTargetDt:[null,Validators.required],
      pfTargetIntRate:[null,Validators.required],
      pfPlannedInvAmt:[null,Validators.required],
      pfInvAmtFeq:[null,Validators.required],
      pfStocklist:this.pffb.array([
        this.initStkItemRows()])
      
      });
  
   //http://plnkr.co/edit/7jJJhkcgqk4YdjFOXTGF?p=preview  --> for form group array
    /*  this.StocklistForm = this.Stocklistfb.group({
        itemRows: this.Stocklistfb.array([this.initStkItemRows()])
      }); */
  }

  UserEdit(event){
    this.onEdit=!this.onEdit;
  }


  initStkItemRows() {
    return this.pffb.group({
        itemname: ['']
    });
}

addNewStkRow() {
  const control = <FormArray>this.pfForm.controls['itemRows'];
  control.push(this.initStkItemRows());
}

deleteStkRow(index: number) {
  const control = <FormArray>this.pfForm.controls['itemRows'];
  control.removeAt(index);
}

}

