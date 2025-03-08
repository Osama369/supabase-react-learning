// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from "../config/supabaseClient";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   async function handleLogin() {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) {
//       setError(error.message);
//       return;
//     }
//     localStorage.setItem("supabaseSession", JSON.stringify(data.session));
//     navigate("/admin");
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Admin Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//           <div className="space-y-4">
//             <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <Button className="w-full" onClick={handleLogin}>Login</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import bcrypt from "bcryptjs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);

    // Fetch user from database
    const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single();

    if (error || !user) {
      alert("User not found!");
      setLoading(false);
      return;
    }

    // Check password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      alert("Invalid password!");
      setLoading(false);
      return;
    }

    // Save session in localStorage
    localStorage.setItem("userSession", JSON.stringify(user));

    // Redirect user to home
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full mt-2" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;


