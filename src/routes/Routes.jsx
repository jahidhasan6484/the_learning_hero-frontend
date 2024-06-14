import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/shared/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Courses from "../pages/Courses";
import DashboardLayout from "../layouts/DashboardLayout";
import MyCourses from "../pages/dashboard/MyCourses";
import AddCourse from "../layouts/AddCourse";
import UpdateCourse from "../pages/dashboard/UpdateCourse";
import CourseDetails from "../pages/CourseDetails";
import MyClassroom from "../pages/dashboard/MyClassroom";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import StartLearning from "../pages/dashboard/StartLearning";
import PrivateRoute from "./PrivateRoute";
import Success from "../pages/payment/Success";
import Cancel from "../pages/payment/Cancel";
import Failed from "../pages/payment/Failed";
import { ConfirmPayment } from "../pages/ConfirmPayment";

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
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/failed",
        element: (
          <PrivateRoute>
            <Failed />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/canceled",
        element: (
          <PrivateRoute>
            <Cancel />
          </PrivateRoute>
        ),
      },
      {
        path: "confirm-payment",
        element: (
          <PrivateRoute>
            <ConfirmPayment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
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
        path: "courses/update/:id",
        element: <UpdateCourse />,
      },
      {
        path: "my-classroom",
        element: <MyClassroom />,
      },
      {
        path: "my-classroom/start-learning/:id",
        element: <StartLearning />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);

export default router;
