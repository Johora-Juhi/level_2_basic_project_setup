import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDeaprtment.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { CourseRoutes } from "../modules/course/course.routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";
import { offeredCoursesRoutes } from "../modules/offeredCourses/offeredCourses.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/academic_semester",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic_faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic_department",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/semseter_registration",
    route: semesterRegistrationRoutes,
  },
  {
    path: "/offered_course",
    route: offeredCoursesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
