import { Routes } from '@angular/router';
// components
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { LessonsComponent } from './pages/lessons';
import { CourseComponent, courseResolver, courseLessonsResolver } from './pages/course';
// guards
import { isUserAuthenticated } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthenticated]
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    canActivate: [isUserAuthenticated],
    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'lessons',
    component: LessonsComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
