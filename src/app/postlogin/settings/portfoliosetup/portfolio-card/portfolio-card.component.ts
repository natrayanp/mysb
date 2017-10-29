import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Router} from "@angular/router";

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit 
{
  onEdit=false;
  public pfForm : FormGroup;
  
  summed: number;
  today = new Date();
  @Input() Mypfdetail;
  @Input() OnAdd;
  Mypfdetailcpy:any;
  OnAddEdit=false;
 
 emptyPayOff = {
      pfstExchange: "",
      pfstTradingsymbl: "",
      pfstLtp: "",
      pfstAmt: 0,
      pfstPercent: "",
      pfstAllotedAmt: 0,
      pfstTotUnit: 0
    };
 
  freqs = ['Daily','Weekly','Fortnightly','Monthly','Quaterly','Halfyearly','Yearly','Adhoc'];
  userSchedules=[{"title":"natrayans Portfolio","description":"for my savings","location":"9.5%","timeStart":this.today,"timeEnd":this.today}];
  AmtSplitTypes=['%','Amount'];
  selectedAmtSplitType = this.AmtSplitTypes[0];
  @Output() cardcancel: EventEmitter<any> = new EventEmitter();
  @Output() cardsave: EventEmitter<any> = new EventEmitter();

  
  
//, private ref: ChangeDetectorRef
  constructor(private pffb: FormBuilder,private router: Router) { 
     

}

  ngOnInit() {


  /*this has to come from master component either as blank or set of value
       this.Mypfdetail = {
  pfPortfolioname: null,
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
}
 // this has to come from master component*/

    if (this.Mypfdetail == null || this.Mypfdetail.pfPortfolioname == null )
    {
      this.onEdit=true;
    }

    this.pfForm = this.pffb.group({ 
      pfPortfolioname:[null,Validators.required],
      pfPurpose:[null],
      pfBeneUsers:[null,Validators.required],
      pfStartDt:[null,Validators.required],
      pfTargetDt:[null,Validators.required],
      pfTargetIntRate:[null,Validators.required],
      pfPlannedInvAmt:[null,Validators.required],
      pfInvAmtFeq:[null,Validators.required],
      pfStkAmtsplittype:[null,Validators.required],
      pfSummed: [0],
      pfStocklists:new FormArray([])
      /*this.pffb.array([
        this.initStkItemRows()])*/
      
      });

      this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
      console.log(JSON.stringify(this.Mypfdetailcpy));
    
    if (this.Mypfdetailcpy !== null){
    this.Mypfdetailcpy.pfStocklists.forEach( 
      (stklstobjor) => {
        //this.pfForm.controls.pfStocklists.push(this.initStkItemRows(po);
        var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
        scontrol.push(this.initStkItemRows(stklstobjor));
       
      }
    );
  }


      this.pfForm.get('pfStocklists').valueChanges.subscribe(values => {
     resolvedPromise.then(() => {
        console.log("resolve");
        console.log(this.pfForm.controls.pfStkAmtsplittype.value);
       switch (this.pfForm.controls.pfStkAmtsplittype.value)
       {
         case "%":
            values.forEach((cure,inder) => {             
              
              this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt = this.Mypfdetailcpy.pfPlannedInvAmt * this.Mypfdetailcpy.pfStocklists[inder].pfstPercent;
              this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfStocklists[inder].pfstLtp;
            });
            break;

         case "Amount":
            values.forEach((cure,inder) => {
              this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt = this.Mypfdetailcpy.pfStocklists[inder].pfstAmt;
              this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfStocklists[inder].pfstLtp;
            });
          break;
        default:
            values.forEach((cure,inder) => this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = 0);
            break;
        };
console.log("outside"+this.Mypfdetailcpy.pfStocklists[0].pfstTotUnit);
        this.summed = values.reduce((acc, cur) => acc + cur.pfstTotUnit, 0);
        this.Mypfdetailcpy.pfSummed = this.summed;
        
      });
      //this.summed = values.reduce((acc, cur) => acc + cur.pfstTotUnit, 0);
    })

    console.log("natnann");
    console.log(this.pfForm);

    this.Cancelutlogic();

/*


   //http://plnkr.co/edit/7jJJhkcgqk4YdjFOXTGF?p=preview  --> for form group array
    //plnkr.co/edit/Q5HYcpnPQosSYvk2KkoP?p=preview
      this.StocklistForm = this.Stocklistfb.group({
        itemRows: this.Stocklistfb.array([this.initStkItemRows()])
      }); */
  }

  UserEdit(event){
    this.onEdit=!this.onEdit;
  }


  initStkItemRows(payOffObj) {
    return new FormGroup({
        pfstExchange : new FormControl(payOffObj.pfstExchange),
        pfstTradingsymbl: new FormControl(payOffObj.pfstTradingsymbl),
        pfstLtp: new FormControl(payOffObj.pfstLtp),
        pfstAmt: new FormControl(payOffObj.pfstAmt),
        pfstPercent: new FormControl(payOffObj.pfstPercent),
        pfstAllotedAmt:new FormControl(payOffObj.pfstAllotedAmt),
        pfstTotUnit: new FormControl(payOffObj.pfstTotUnit)
    });
}

 
AmtSplitchange(newobjval){
 this.Mypfdetailcpy.pfStkAmtsplittype = this.selectedAmtSplitType;

  switch (this.selectedAmtSplitType)
  {
    case "%":
      this.Mypfdetailcpy.pfStocklists.forEach((cure,inder) => {
        this.Mypfdetailcpy.pfStocklists[inder].pfstAmt = 0;
        const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstAmt'].patchValue(0);        
      });
      break;
    case "Amount":
      this.Mypfdetailcpy.pfStocklists.forEach((cure,inder) => {
        this.Mypfdetailcpy.pfStocklists[inder].pfstPercent = 0;
       const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstPercent'].patchValue(0);
        
      });
      break;      
  }
}

addNewStkRow() {
  event.preventDefault(); // ensure this button doesn't try to submit the form


    this.Mypfdetailcpy.pfStocklists.push(JSON.parse(JSON.stringify(this.emptyPayOff)));
    //this.pfForm.controls.payOffs.push(this.createPayOffFormGroup(emptyPayOff)); 

       const control = <FormArray>this.pfForm.controls['pfStocklists'];
       console.log(control);
       control.push(this.initStkItemRows(this.emptyPayOff));
}

deleteStkRow(index: number) {
  this.Mypfdetailcpy.pfStocklists.splice(index, 1);
  const control = <FormArray>this.pfForm.controls['pfStocklists'];
  control.removeAt(index);
 
}


Cancelutlogic(){
  
  if (this.OnAdd==true || this.onEdit==false){
      return true;
    }
    else{
    return false;
    }
}

cancel_cardedit(){
  this.onEdit=!this.onEdit;
  this.cardcancel.emit(null);
  //To be implemented either with service or with emitter to go back to parent
}

save_cardedit(pfFormfrm){
  this.onEdit=!this.onEdit;
  this.cardsave.emit(pfFormfrm);
  //To be implemented either with service or with emitter to go back to parent
}

}













/*

{
  onEdit=false;
  public pfForm : FormGroup;
  
  summed: number;
  today = new Date();
  Mypfdetailcpy:any;

  emptystklstobj= {
    pfstExchange: "",
    pfstTradingsymbl: "",
    pfstLtp: 0,
    pfstAmt: 0,
    pfstPercent: 0,
    pfstAllotedAmt: 0,
    pfstTotUnit: 0    
  };

  freqs = ['Daily','Weekly','Fortnightly','Monthly','Quaterly','Halfyearly','Yearly','Adhoc'];
  //userSchedules=[{"title":"natrayans Portfolio","description":"for my savings","location":"9.5%","timeStart":this.today,"timeEnd":this.today}];
  AmtSplitTypes=['%','Amount'];
  
  selectedAmtSplitType = this.AmtSplitTypes[0];

  


  

  
  constructor(private pffb: FormBuilder) {   

}

  ngOnInit() {


    //Initialising the form
    this.pfForm = this.pffb.group({ 
      pfPortfolioname:[null,Validators.required],
      pfPurpose:[null],
      pfBeneUsers:[null,Validators.required],
      pfStartDt:[null,Validators.required],
      pfTargetDt:[null,Validators.required],
      pfTargetIntRate:[null,Validators.required],
      pfPlannedInvAmt:[null,Validators.required],
      pfInvAmtFeq:[null,Validators.required],
      pfStkAmtsplittype:[null,Validators.required],
      pfSummed: [0],
      pfStocklists:new FormArray([])
      /*pfStocklists:this.pffb.array([
        this.initStkItemRows()])*    
      });

      //Pushing the data into the form

      this.Mypfdetail.pfStocklists.forEach( 
        (stklstobjor) => {
          //this.pfForm.controls.pfStocklists.push(this.initStkItemRows(po);
          var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
          scontrol.push(this.initStkItemRows(stklstobjor));
         
        }
      );

      this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
      console.log(JSON.stringify(this.Mypfdetailcpy));

      this.pfForm.get('pfStocklists').valueChanges.subscribe(values => {        
        resolvedPromise.then(() => {
           console.log("resolve");
           console.log(this.pfForm.controls.pfStkAmtsplittype.value);
           console.log(values);
          switch (this.pfForm.controls.pfStkAmtsplittype.value)
          {
            case "%":
   
            
   
               values.forEach((cure,inder) => {
                  this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = this.Mypfdetailcpy.pfStocklists[inder].pfstLtp * this.Mypfdetailcpy.pfStocklists[inder].pfstPercent;
                 /* var ltp: number = <number> (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstLtp'].value;
                  var percent: number = <number>(<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstPercent'].value;
                  var patchvaluesis:number = ltp*percent;
                  var dummy = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstTotUnit'].patchValue(patchvaluesis) ;*
               });
               break;
   
            case "Amount":
              
              values.forEach((cure,inder) => {
                this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit =this.Mypfdetailcpy.pfStocklists[inder].pfstLtp * this.Mypfdetailcpy.pfStocklists[inder].pfstAmt;
                /*var ltp: number = <number> (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstLtp'].value;
                var amt: number = <number>(<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstAmt'].value;
                var patchvaluesis:number = ltp*amt;
                var dummy = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstTotUnit'].patchValue(patchvaluesis);*
              });
              break;

           default:
               values.forEach((cure,inder) => {
                
                this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit =0;
                /*var patchvaluesis:number = 0;
                var dummy = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstTotUnit'].patchValue(patchvaluesis); *           
               });
               break;
           };

           this.summed = values.reduce((acc, cur) => acc + cur.pfstTotUnit, 0);
           //this.myModel.pfSummed = this.summed;
           
         });
         //this.summed = values.reduce((acc, cur) => acc + cur.pfstTotUnit, 0);
       })
  
   //http://plnkr.co/edit/7jJJhkcgqk4YdjFOXTGF?p=preview  --> for form group array
    /*  this.StocklistForm = this.Stocklistfb.group({
        itemRows: this.Stocklistfb.array([this.initStkItemRows()])
      }); *
  }

  UserEdit(event){
    this.onEdit=!this.onEdit;
  }


  initStkItemRows(stklstobj) {
   /* return this.pffb.group({
        pfstExchange : [''],
        pfstTradingsymbl: [''],
        pfstLtp: [''],
        pfstAmt: [0],
        pfstPercent: [''],
        pfstAllotedAmt:[0],
        pfstTotUnit:[
    });*

    return new FormGroup({
      pfstExchange : new FormControl(stklstobj.pfstExchange),
      pfstTradingsymbl: new FormControl(stklstobj.pfstTradingsymbl),
      pfstLtp: new FormControl(stklstobj.pfstLtp),
      pfstAmt: new FormControl(stklstobj.pfstAmt),
      pfstPercent: new FormControl(stklstobj.pfstPercent),
      pfstAllotedAmt:new FormControl(stklstobj.pfstAllotedAmt),
      pfstTotUnit: new FormControl(stklstobj.pfstTotUnit)
  });
}

addNewStkRow() {
  //event.preventDefault(); 
  console.log("inside");
  this.Mypfdetail.pfStocklists.push(JSON.parse(JSON.stringify(this.emptystklstobj)));  

  const dummy = <FormArray>this.pfForm.controls['pfStocklists'];
  
  const control = <FormArray>this.pfForm.controls['pfStocklists'];
  console.log(control.controls);
  control.push(this.initStkItemRows(this.emptystklstobj));    
}

deleteStkRow(index: number) {
  console.log("printint"+index);
  this.Mypfdetail.pfStocklists.splice(index, 1);
  const control = <FormArray>this.pfForm.controls['pfStocklists'];
  control.removeAt(index);
}

//If change in amoutnsplit type is done
AmtSplitchange(newobjval){
  this.Mypfdetailcpy.pfStkAmtsplittype = this.selectedAmtSplitType;
  
   switch (this.selectedAmtSplitType)
   {
     case "%":

        this.Mypfdetailcpy.pfStocklists.forEach((cure,inder) => {
          this.Mypfdetailcpy.pfStocklists[inder].pfstAmt = 0;
         var dummy = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstAmt'].patchValue(0);         
        });

       break;

     case "Amount": 
        this.Mypfdetailcpy.pfStocklists.forEach((cure,inder) => {
         this.Mypfdetailcpy.pfStocklists[inder].pfstPercent = 0;
        var dummy = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstPercent'].patchValue(0);         
       });
       break;      
   }
 }



}


*/