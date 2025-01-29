import {
  Component,
  computed,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
// models
import { Course, sortCoursesBySeqNo } from '../../models/course.model';
// components
import { CoursesCardListComponent } from '../../components/courses-card-list';
import { openEditCourseDialog } from '../../components/edit-course-dialog';

// services
import { CoursesService } from '../../services';
import { MessagesService } from '../../components/messages';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  #courses = signal<Course[]>([]);
  
  messageService = inject(MessagesService);
  coursesService = inject(CoursesService);

  dialog = inject(MatDialog);
  injector = inject(Injector);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'BEGINNER');
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'ADVANCED');
  });


  beginnersList = viewChild<CoursesCardListComponent>('beginnersList');

  constructor() {
    this.loadCourses().then(() =>
      console.log(`All courses loaded:`, this.#courses())
    );
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (err) {
      this.messageService.showMessage(`Error loading courses!`, 'error');
      console.error(err);
    }
  }

  onCourseUpdated(updatedCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    this.#courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (err) {
      console.error(err);
      alert(`Error deleting course.`);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'Create New Course',
    });
    if (!newCourse) {
      return;
    }
    const newCourses = [...this.#courses(), newCourse];
    this.#courses.set(newCourses);
  }
}
