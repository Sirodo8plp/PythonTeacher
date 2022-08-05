import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent implements OnInit {
  @Input()
  command?: string;
  constructor() {}

  ngOnInit(): void {}
}
