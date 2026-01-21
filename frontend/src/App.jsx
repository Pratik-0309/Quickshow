import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import MyBooking from "./pages/MyBooking.jsx";
import Favourite from "./pages/Favourite.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import Layout from "./pages/Admin/Layout.jsx";
import DashBoard from "./pages/Admin/DashBoard.jsx";
import AddShow from "./pages/Admin/AddShow.jsx";
import ListShow from "./pages/Admin/ListShow.jsx";
import ListBooking from "./pages/Admin/ListBooking.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const navigate = useNavigate();
  const { user, isAdmin } = useAppContext();

  useEffect(()=> {
    if(user && !isAdmin && isAdminRoute){
      navigate('/');
    }
  },[isAdmin]);

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route
          path="/admin/*"
          element={
           user ? (
              isAdmin ? ( 
                <Layout /> 
              ) : ( 
                null
              )
            ) : (
              <div className="min-h-screen flex justify-center items-center">
                <SignIn fallbackRedirectUrl={"/admin"} />
              </div>
            )
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="add-shows" element={<AddShow />} />
          <Route path="list-shows" element={<ListShow />} />
          <Route path="list-bookings" element={<ListBooking />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
