import Footer from "./components/Footer";
import NavBar from "./components/Navbar/UserNavBar";
import { Routes, Route } from "react-router-dom";
import GuestHome from "./pages/Home/GuestHome";
import Login from "./pages/Login-Sign/Login";
import UserSignUp from "./pages/Login-Sign/UserSignUp";
import ManagerSignUp from "./pages/Login-Sign/ManagerSignUp";
import UserProvider from "./context/UserContext";
import NotFound from "./components/NotFound";


function App() {

  return (
    <div className="bg-black">
      <UserProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-sign-up" element={<UserSignUp />} />
          <Route path="/manager-sign-up" element={<ManagerSignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </UserProvider>
      
    </div>
    )
}


  

export default App;