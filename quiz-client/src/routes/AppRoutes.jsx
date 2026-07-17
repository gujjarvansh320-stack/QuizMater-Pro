import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
// import History from "../pages/History";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import About from "../pages/About";
import Dashboard from "../pages/Admin/Dashboard";
import AdminCategories from "../pages/Admin/AdminCategories";
import Questions from "../pages/Admin/Questions";
import Users from "../pages/Admin/Users";
import Results from "../pages/Admin/Results";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import AdminLayout from "../components/Admin/AdminLayout";
// import AdminLayout from "../components/Admin/AdminLayout";

// import Dashboard from "../pages/Admin/Dashboard";
// import AdminCategories from "../pages/Admin/AdminCategories";
// import Questions from "../pages/Admin/Questions";
// import Results from "../pages/Admin/Results";
// import Users from "../pages/Admin/Users";
// import AdminLayout from "../components/Admin/AdminLayout";
// import AdminCategories from "../pages/Admin/AdminCategories";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />

      {/* Protected Routes */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:categoryId"
        element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result/:id"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      /> */}
      <Route
      // path="/admin"
      // element={
      //     <AdminLayout />
      // }
      />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<Dashboard />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/questions" element={<Questions />} />
      <Route path="/admin/results" element={<Results />} />
      <Route path="/admin/users" element={<Users />} />

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
