import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IUser } from 'src/interfaces/IUser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  registerUsername?: string;
  registerPassword?: string;
  registerError?: string;
  loginUsername?: string;
  loginPassword?: string;
  loginError?: string;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  async RegisterHandle() {
    if (this.registerUsername === '' || !this.registerUsername) {
      this.registerError = 'Username cannot be empty.';
      return;
    }
    if (this.registerPassword === '' || !this.registerPassword) {
      this.registerError = 'Password cannot be empty.';
      return;
    }
    const user = await this.db.users
      .where('username')
      .equals(this.registerUsername)
      .first();
    if (user && user.username === this.registerUsername) {
      this.registerError =
        'Username already exists. Please, use another username.';
      return;
    }
    const id = (await this.db.users.count()) + 1;
    await this.db.users.add({
      id: id,
      username: this.registerUsername,
      password: this.registerPassword,
    });
    this.userService.setUser({
      id: id,
      username: this.registerUsername,
      password: this.registerPassword,
    });
    this.router.navigate(['/introduction']);
  }

  async LoginHandle() {
    if (this.loginUsername === '' || !this.loginUsername) {
      this.loginError = 'Username cannot be empty.';
      return;
    }
    if (this.loginPassword === '' || !this.loginPassword) {
      this.loginError = 'Password cannot be empty.';
      return;
    }
    const user = await this.db.users
      .where('username')
      .equals(this.loginUsername)
      .first();
    if (!user) {
      this.loginError = 'User was not found.';
      return;
    }
    this.setDbUser(user);
    this.router.navigate(['/introduction']);
  }

  setDbUser(user: IUser) {
    this.userService.setUser(user);
  }
}
