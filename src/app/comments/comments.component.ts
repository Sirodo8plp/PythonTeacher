import { Component, OnInit } from '@angular/core';
import { IChapter } from 'src/interfaces/Chapter';
import { IExercise } from 'src/interfaces/IExercise';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  exercise?: IExercise;

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.getExercise();
  }

  async getExercise() {
    const chapter: IChapter | undefined = await this.db.chapters.get(1);
    this.exercise =
      chapter?.exercises[Math.floor(Math.random() * chapter?.exercises.length)];
  }
}
