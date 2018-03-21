import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';

@Component({
  selector: 'exams',
  template: `
    <div>
      <button routerLink="/new-exam">New Exam</button>
      <ul>
        <li *ngFor="let exam of examsList">
          {{exam.title}}
        </li>
      </ul>
    </div>
  `
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSubs: Subscription;
  examsList: Exam[];
  authenticated = false;

  constructor(private examsApi: ExamsApiService) { }

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe(res => {
          this.examsList = res;
        },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.examsListSubs.unsubscribe();
  }
}
