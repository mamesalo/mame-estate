// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";

import MyHeader from "./components/MyHeader";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/NewProfile";
import NewSignIn from "./pages/NewSignIn";

export default function App() {
  return (
    <BrowserRouter>
      <MyHeader />
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/sign-in" element ={<NewSignIn/>}/>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/properties/:propertyId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/new-properties" element={<CreateListing />} />
          <Route path="/update-properties/:propertyId" element={<UpdateListing/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
}
