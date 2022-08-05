import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],
})
export class GetStartedComponent {
  commands: string[];
  constructor() {
    this.commands = [
      'C:\\Users\\<i>Your Name</i>>python --version ',
      'python --version ',
      'C:\\Users\\<i>Your Name</i>>python helloworld.py',
      'C:\\Users\\<i>Your Name</i>>python helloworld.py',
      'Hello, World!',
      'C:\\Users\\<i>Your Name</i>>python ',
      'C:\\Users\\<i>Your Name</i>>py ',
      `C:\\Users\\<i>Your Name</i>>python <br>
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:04:45) [MSC v.1900 32 bit (Intel)] on win32 <br>
Type "help", "copyright", "credits" or "license" for more information.<br>
>>> print("Hello, World!") `,
      `C:\\Users\\<i>Your Name</i>>python <br>
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:04:45) [MSC v.1900 32 bit (Intel)] on win32 <br>
Type "help", "copyright", "credits" or "license" for more information. <br>
>>> print("Hello, World!")
Hello, World! `,
      'exit()',
    ];
  }
}
