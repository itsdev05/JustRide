import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookingcar from "./pages/BookingCar";
import UserBooking from "./pages/UserBooking";
import Addcar from "./pages/AddCar";
import Editcar from "./pages/EditCar";
import AdminHome from "./pages/AdminHome";
import Contact from "./components/Contact";
import FeedbackForm from "./pages/FeedbackForm";
import Profile from './pages/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/contact"
            exact
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}>
            {" "}
          </Route>
          <Route
            path="/booking"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/booking/:id"
            exact
            element={
              <ProtectedRoute>
                <Bookingcar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/userbookings"
            exact
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/userbookings/:id"
            exact
            element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/addcar"
            exact
            element={
              <ProtectedRoute>
                <Addcar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/editcar/:carid"
            exact
            element={
              <ProtectedRoute>
                <Editcar />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="booking/:id/booking/feedback"
            exact
            element={
              <ProtectedRoute>
                <FeedbackForm/>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            exact
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("user");
  return auth ? children : <Navigate to="/login"></Navigate>;
}
