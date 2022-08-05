import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PythonTeacher';
  username?: string;
  constructor(private db: DatabaseService, private userService: UserService) {}

  async insertData() {
    // await this.db.chapters.bulkAdd([
    //   {
    //     id: 0,
    //     nextChapter: 1,
    //     previousChapter: 0,
    //     title: 'Python Get Started',
    //     exercises: [],
    //   },
    //   {
    //     id: 1,
    //     nextChapter: 2,
    //     previousChapter: 0,
    //     title: 'Python Syntax',
    //     exercises: [
    //       {
    //         id: 0,
    //         problem: `("Hello, World!")`,
    //         solution: 'print',
    //         topic: `Insert the missing part of the code below to output "Hello World".`,
    //       },
    //       {
    //         id: 1,
    //         problem: ` helloworld.py`,
    //         solution: 'python',
    //         topic: `Which word do you have to use in order to run the program "helloworld.py"?`,
    //       },
    //       {
    //         id: 2,
    //         problem:
    //           'Choose and write one and only one option from inside the parenthesis.',
    //         solution: '>1',
    //         topic: `Which is the required number of spaces for indentation? (0,4,>1)`,
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     nextChapter: 2,
    //     previousChapter: 1,
    //     title: 'Python Comments',
    //     exercises: [
    //       {
    //         id: 0,
    //         problem: '',
    //         solution: `"""`,
    //         topic: `Which character can you use 3 times in a row in order to insert a multi-line comment?`,
    //       },
    //       {
    //         id: 1,
    //         problem: 'This is a comment',
    //         solution: `#`,
    //         topic: `Comments in Python are written with a special character, which one?`,
    //       },
    //     ],
    //   },
    // ]);
    this.db.scores.bulkDelete([0, 1, 2, 3, 4, 5]);
  }

  ngOnInit(): void {
    this.username = this.userService.getUser()?.username;
  }
}
