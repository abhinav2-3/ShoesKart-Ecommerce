import "./styles/App.scss";
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const Home = lazy(() => import("./screens/Home"));
const About = lazy(() => import("./screens/About"));
const SingleProduct = lazy(() => import("./screens/SingleProduct"));
const Signup = lazy(() => import("./screens/Signup"));
const Login = lazy(() => import("./screens/Login"));
const Products = lazy(() => import("./screens/Products"));
const Cart = lazy(() => import("./screens/Cart"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));
const Contacts = lazy(() => import("./screens/Contacts"));
const MyOrder = lazy(() => import("./screens/MyOrder"));
const UserProfile = lazy(() => import("./screens/UserProfile"));
const Admin = lazy(() => import("./screens/AddProduct"));

function App() {
  const notify = () =>
    toast.loading("Please wait a moment", { duration: 1500 });

  useEffect(() => {
    notify();
  }, []);

  return (
    <Router>
      <Analytics />
      <Toaster />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myOrders" element={<MyOrder />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/singleProduct" element={<SingleProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
