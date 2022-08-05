import { Component, OnInit } from '@angular/core';
import { IScore } from 'src/interfaces/Score';
import { DatabaseService } from '../database.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  scores?: IScore[];
  chapterMap = new Map<number, string>();
  plotExercisesData?: any;
  plotTestsData?: any;
  testComment?: string;
  constructor(private db: DatabaseService, private userService: UserService) {
    this.chapterMap.set(0, 'Syntax');
    this.chapterMap.set(1, 'Comments');
  }

  ngOnInit(): void {
    this.db.scores
      .where('userID')
      .equals(this.userService.getUser()!.id)
      .toArray()
      .then((data) => {
        this.scores = data;
        this.prepareChapterExercisesData();
        this.prepareTestData();
      });
  }

  prepareChapterExercisesData() {
    const labels: string[] = [];
    const data: number[] = [];
    this.scores?.forEach((score) => {
      labels.push(this.chapterMap.get(score.chapterID)!);
      data.push(score.score);
    });
    this.plotExercisesData = {
      labels: labels,
      datasets: [
        {
          label: 'Score',
          backgroundColor: '#0000FF',
          data: data,
        },
      ],
    };
  }

  async prepareTestData() {
    const labels: any = [];
    const data: number[] = [];
    const testCount = await this.db.tests
      .where('userID')
      .equals(this.userService.getUser()!.id)
      .count();
    if (testCount > 0) {
      const testScores = await this.db.tests.toArray();
      testScores.sort((a, b) => a.id - b.id);
      this.testComment = testScores[testCount - 1].comment;
      testScores.forEach((score) => {
        labels.push(`Test ${score.id}`);
        console.log('score' + score.score);
        data.push(score.score);
      });
      console.table(data);
      this.plotTestsData = {
        labels: labels,
        datasets: [
          {
            label: 'Test',
            backgroundColor: '#0000FF',
            data: data,
          },
        ],
      };
    }
  }
}
