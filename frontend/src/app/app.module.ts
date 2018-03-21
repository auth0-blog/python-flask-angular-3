import {
  MatToolbarModule, MatButtonModule, MatCardModule
} from '@angular/material';
import * as Auth0 from 'auth0-web';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ExamsApiService} from './exams/exams-api.service';

import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';
import {CallbackComponent} from './callback.component';

const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-exam', component: ExamFormComponent },
  { path: '', component: ExamsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ExamFormComponent,
    ExamsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [ExamsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'bk-samples.auth0.com',
      audience: 'https://online-exam.digituz.com.br',
      clientID: 'oz1Ip4EX1dyCft0rUjzTc9PnHRvtuh9a',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams'
    });
  }
}
