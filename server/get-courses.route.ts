import { Request, Response } from 'express';

interface Course {
  id: string;
  description: string;
  // Add other properties as needed
}
import { COURSES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
  /*
      console.log("ERROR loading courses!");
      res.status(500).json({message: 'error occurred.'});
      return;
  */

  setTimeout(() => {
    res.status(200).json({ courses: Object.values(COURSES) });
  }, 1500);
}

export function getCourseById(req: Request, res: Response) {
  setTimeout(() => {
    const courseId = req.params['id'];

    const courses: any = Object.values(COURSES);

    const course: Course | undefined = courses.find((course: Course) => course.id == courseId);

    res.status(200).json(course);
  }, 1500);
}
