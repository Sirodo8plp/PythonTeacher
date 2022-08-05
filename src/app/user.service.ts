import { Injectable } from '@angular/core';
import { IUser } from 'src/interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: IUser;
  constructor() {}

  setUser(user: IUser) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
