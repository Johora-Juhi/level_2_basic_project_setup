import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDeaprtment.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { CourseRoutes } from "../modules/course/course.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
