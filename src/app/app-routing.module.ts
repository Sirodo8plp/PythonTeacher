import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { PracticeComponent } from './practice/practice.component';
import { ProfileComponent } from './profile/profile.component';
import { SyntaxComponent } from './syntax/syntax.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'syntax', component: SyntaxComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'practice', component: PracticeComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
