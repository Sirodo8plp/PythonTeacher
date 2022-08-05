import { Component, OnInit } from '@angular/core';
import { IExercise } from 'src/interfaces/IExercise';
import { DatabaseService } from '../database.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements OnInit {
  exercises?: IExercise[];
  answers: string[];
  chapterNames: Map<number, string> = new Map<number, string>();
  warningMessage?: string;
  successMessage?: string;
  display: string;
  constructor(private db: DatabaseService, private userService: UserService) {
    this.answers = ['', '', '', '', ''];
    this.display = 'block';
  }

  ngOnInit(): void {
    this.prepareExercises();
  }

  async prepareExercises() {
    const scores = await this.db.scores
      .where('userID')
      .equals(this.userService.getUser()!.id)
      .toArray();
    const chapters = await this.db.chapters.toArray();
    chapters.forEach((chapter) =>
      this.chapterNames.set(chapter.id, chapter.title)
    );
    const chapterCount = await this.db.chapters.count();
    if (scores.length > 0) {
      const stats: number[] = [];
      for (let i = 0; i < chapterCount; i++) stats[i] = 0;
      scores.forEach((score) => {
        stats[score.chapterID] += score.score;
      });
      let minIndex = stats.indexOf(Math.min(...stats));
      this.exercises = chapters[minIndex].exercises;
      stats[minIndex] = Number.MAX_SAFE_INTEGER - stats[minIndex];
      minIndex = stats.indexOf(Math.min(...stats));
      this.exercises = this.exercises.concat(
        chapters[minIndex].exercises.slice(0, 2)
      );
      return;
    }

    this.exercises = chapters[this.randomInteger(chapters)].exercises.concat(
      chapters[this.randomInteger(chapters)].exercises.slice(0, 2)
    );
  }

  async onSubmit() {
    let correctAnswersCount = 0;
    const ids = this.exercises!.map((exe) => {
      return exe.chapterID;
    });
    let wrongAnswersCount: Array<number> = new Array(Math.max(...ids) + 1).fill(
      0
    );
    for (let i = 0; i < 5; i++) {
      if (this.answers[i] === this.exercises![i].solution) {
        correctAnswersCount++;
        await this.db.scores.add({
          score: 5,
          chapterID: this.exercises![i].chapterID,
          userID: this.userService.getUser()!.id,
        });
      } else {
        wrongAnswersCount[this.exercises![i].chapterID] += 1;
        await this.db.scores.add({
          score: 1,
          chapterID: this.exercises![i].chapterID,
          userID: this.userService.getUser()!.id,
        });
      }
    }
    const worstChapterPerfomanceIndex = wrongAnswersCount.indexOf(
      Math.max(...wrongAnswersCount)
    );
    if (correctAnswersCount < 5) {
      this.warningMessage = `You may need to revise some of the contents learnt in "${this.chapterNames!.get(
        worstChapterPerfomanceIndex
      )}"`;
    } else {
      this.successMessage = 'Congratulations! All your answers were correct!';
    }
    const testCount = await this.db.tests.count();
    await this.db.tests.add({
      comment: this.warningMessage || this.successMessage || '',
      id: testCount + 1,
      score: (correctAnswersCount / 5) * 100,
      userID: this.userService.getUser()!.id,
    });
    this.display = 'none';
  }

  randomInteger(arr: any[]) {
    return Math.floor(Math.random() * arr.length);
  }
}
