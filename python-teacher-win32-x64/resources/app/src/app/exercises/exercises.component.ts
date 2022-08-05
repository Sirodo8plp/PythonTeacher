import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  response?: string;
  cssClass?: string;
  isCompleted?: boolean;
  @Input()
  chapterID?: number;
  @Input()
  correctAnswer?: string;
  @Input()
  exerciseTopic?: string;
  @Input()
  exerciseProblem?: string;

  userAnswer?: string;
  constructor(private db: DatabaseService, private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.correctAnswer);
  }

  async onSubmit() {
    const chapterCount = await this.db.chapters.count();
    if (this.userAnswer !== this.correctAnswer) {
      this.setColors('Oups! You were incorrect, but I think you are close!');
      await this.addWrongAnswer();
      this.userAnswer = '';
      return;
    }
    this.chapterID! === chapterCount - 1
      ? this.setColors(
          'Correct. This is the end of the course. You should now practice.'
        )
      : this.setColors('Correct! Proceed to the next chapter!');
    await this.addCorrectAnswer();
    this.userAnswer = '';
    return;
  }

  async addCorrectAnswer() {
    this.db.scores.add({
      chapterID: this.chapterID!,
      score: 5,
      userID: this.userService.getUser()!.id,
    });
  }

  async addWrongAnswer() {
    await this.db.scores.add({
      chapterID: this.chapterID!,
      score: 1,
      userID: this.userService.getUser()!.id,
    });
  }

  setColors(response: string) {
    this.response = response;
    this.cssClass = response.startsWith('Oups')
      ? 'alert alert-danger'
      : 'alert alert-success';
    this.isCompleted = response.startsWith('Oups') ? false : true;
  }
}
