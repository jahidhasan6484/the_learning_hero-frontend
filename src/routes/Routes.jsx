import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/shared/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Courses from "../pages/Courses";
import DashboardLayout from "../layouts/DashboardLayout";
import MyCourses from "../pages/dashboard/MyCourses";
import Statistics from "../pages/dashboard/Statistics";
import AddCourse from "../layouts/AddCourse";
import UpdateCourse from "../pages/dashboard/UpdateCourse";
import CourseDetails from "../pages/CourseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "latest-courses",
        element: <Courses />,
      },
      {
        path: "details/:id",
        element: <CourseDetails />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MyCourses />,
      },
      {
        path: "courses",
        element: <MyCourses />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "courses/update/:id",
        element: <UpdateCourse />,
      },
    ],
  },
]);

export default router;
