import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminPanel from "./pages/AdminPanel";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import supabase from "./config/supabaseClient";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import AdminLogin from "./auth/AdminLogin";
function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function checkUserSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuth(true);
      }
    }
    checkUserSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='adminlogin' element ={<AdminLogin/>}></Route>
        <Route path='/admin' element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
