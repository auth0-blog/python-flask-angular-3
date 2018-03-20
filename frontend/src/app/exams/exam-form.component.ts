import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamsApiService} from "./exams-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'exam-form',
  template: `
    <div>
      <h2>New Exam</h2>
      <label for="exam-title">Title</label>
      <input id="exam-title" (keyup)="updateTitle($event)">
      <label for="exam-description">Description</label>
      <input id="exam-description" (keyup)="updateDescription($event)">
      <button (click)="saveExam()">Save Exam</button>
    </div>
  `
})
export class ExamFormComponent {
  exam = {
    title: '',
    description: '',
  };

  constructor(private examsApi: ExamsApiService, private router: Router) { }

  updateTitle(event: any) {
    this.exam.title = event.target.value;
  }

  updateDescription(event: any) {
    this.exam.description = event.target.value;
  }

  saveExam() {
    this.examsApi
      .saveExam(this.exam)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
