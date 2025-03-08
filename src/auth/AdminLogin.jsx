import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleAdminLogin() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Invalid credentials!");
      setLoading(false);
      return;
    }

    localStorage.setItem("supabaseSession", JSON.stringify(data.session));
    navigate("/admin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Admin Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full mt-2" onClick={handleAdminLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
           
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminLogin;
