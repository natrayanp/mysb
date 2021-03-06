import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { HttpModule }    from '@angular/http';


import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { MatCard } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import {MatStepperModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatChipsModule} from '@angular/material';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {MatTabsModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';


import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from './app.routes';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { LoginComponent } from './home/login/login.component';
import { Dialog1 } from './home/login/login.component';
import { SetjwtService } from './natservices/setjwtservice.service';
import { LogincheckComponent } from './logincheck/logincheck.component';
import { PostloginComponent } from './postlogin/postlogin.component';
import { PostlogintoolbarComponent } from './postlogin/postlogintoolbar/postlogintoolbar.component';
import { DashboardComponent } from './postlogin/dashboard/dashboard.component';
import { OrdersComponent } from './postlogin/orders/orders.component';
import { PfqtypopupComponent } from './postlogin/orders/pfqtypopup/pfqtypopup.component';
import { SettingsComponent } from './postlogin/settings/settings.component';
import { UserssetupComponent } from './postlogin/settings/userssetup/userssetup.component';
import { UserListComponent } from './postlogin/settings/userssetup/user-list/user-list.component';
import { UserCardComponent } from './postlogin/settings/userssetup/user-card/user-card.component';
import { PortfoliosetupComponent } from './postlogin/settings/portfoliosetup/portfoliosetup.component';
import { PortfolioCardComponent } from './postlogin/settings/portfoliosetup/portfolio-card/portfolio-card.component';
import { PortfolioListComponent } from './postlogin/settings/portfoliosetup/portfolio-list/portfolio-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    Dialog1,
    LogincheckComponent,
    PostloginComponent,
    PostlogintoolbarComponent,
    DashboardComponent,
    OrdersComponent,
    PfqtypopupComponent,
    SettingsComponent,
    UserssetupComponent,
    UserListComponent,
    UserCardComponent,
    PortfoliosetupComponent,
    PortfolioCardComponent,
    PortfolioListComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      FlexLayoutModule,
      MatInputModule,
      MatFormFieldModule,
      MatAutocompleteModule,    
      FormsModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
      MatStepperModule,
      MatExpansionModule,
      MatRadioModule,
      MatSelectModule,
      MatChipsModule,
      MatIconModule,
      MatTabsModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatSnackBarModule,
      MatDatepickerModule,MatNativeDateModule,
    RouterModule.forRoot(ROUTES ,/*{enableTracing: true }*/)
  ],
  entryComponents: [Dialog1,PfqtypopupComponent],
  providers: [SetjwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
