import { Component, OnInit } from '@angular/core';
import { IChapter } from 'src/interfaces/Chapter';
import { IExercise } from 'src/interfaces/IExercise';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-syntax',
  templateUrl: './syntax.component.html',
  styleUrls: ['./syntax.component.css'],
})
export class SyntaxComponent implements OnInit {
  commands?: string[];
  exercise?: IExercise;

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.commands = [
      `>>> print("Hello, World!") <br>
Hello, World! `,
      'C:\\Users\\<i>Your Name</i>>python myfile.py ',
    ];
    this.getExercise();
  }

  async getExercise() {
    const chapter: IChapter | undefined = await this.db.chapters.get(0);
    this.exercise =
      chapter?.exercises[Math.floor(Math.random() * chapter?.exercises.length)];
  }
}
