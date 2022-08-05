import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { IChapter } from 'src/interfaces/Chapter';
import { IScore } from 'src/interfaces/Score';
import { IUser } from 'src/interfaces/IUser';
import { IExercise } from 'src/interfaces/IExercise';
import { ITest } from 'src/interfaces/Test';

@Injectable()
export class DatabaseService extends Dexie {
  chapters!: Table<IChapter, Number>;
  exercises!: Table<IExercise, Number>;
  scores!: Table<IScore, Number>;
  users!: Table<IUser, String>;
  tests!: Table<ITest, Number>;

  constructor() {
    super('LearnerDatabase');
    this.version(4).stores({
      chapters: '++id,title,previousChapter,nextChapter,exercises',
      exercises: '++id,problem,solution,topic,chapterID',
      scores: '++id,score,chapterID,userID',
      users: '++id,username,password',
      tests: '++id,score,userID,comment',
    });

    // this.chapters.bulkAdd([
    //   {
    //     id: 0,
    //     nextChapter: 1,
    //     previousChapter: 0,
    //     title: 'Python Syntax',
    //     exercises: [
    //       {
    //         chapterID: 0,
    //         id: 0,
    //         problem: `("Hello, World!")`,
    //         solution: 'print',
    //         topic: `Add the missing keyword in order to print "Hello, World!" to the console.`,
    //       },
    //       {
    //         chapterID: 0,
    //         id: 1,
    //         problem: ` helloworld.py`,
    //         solution: 'python',
    //         topic: `Which command do you have to use in order to execute the "helloworld.py" program?`,
    //       },
    //       {
    //         chapterID: 0,
    //         id: 2,
    //         problem: '',
    //         solution: '>1',
    //         topic: `Which is the minimum number of spaces you need for indentation?`,
    //       },
    //     ],
    //   },
    //   {
    //     id: 1,
    //     nextChapter: 1,
    //     previousChapter: 0,
    //     title: 'Python Comments',
    //     exercises: [
    //       {
    //         chapterID: 1,
    //         id: 3,
    //         problem: 'This is a comment.',
    //         topic:
    //           'Python has a special character for inserting a comment. Which one?',
    //         solution: '#',
    //       },
    //       {
    //         chapterID: 1,
    //         id: 4,
    //         problem: '',
    //         topic: `Which character can you use three times in a row in order to insert a mutli line comment?`,
    //         solution: `"`,
    //       },
    //       {
    //         chapterID: 1,
    //         id: 5,
    //         problem: " Write either 'Yes' or 'No'.",
    //         topic: `Does python provide an actual way to insert a multi-line comment?`,
    //         solution: 'No',
    //       },
    //     ],
    //   },
    // ]);
  }
}
