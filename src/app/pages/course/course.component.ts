import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// models
import { Course } from '../../models/course.model';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  course = signal<Course | null>(null);

  lessons = signal<Lesson[]>([]);

  route = inject(ActivatedRoute);

  ngOnInit() {
    this.course.set(this.route.snapshot.data["course"]);
    this.lessons.set(this.route.snapshot.data["lessons"]);
  }

}
