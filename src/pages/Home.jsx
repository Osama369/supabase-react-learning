// // src/pages/Home.jsx
// import { useEffect, useState } from 'react';
// import supabase from '../config/supabaseClient';
// import MessageForm from '../components/MessageForm'
// import MessageList from '../components/MessageList'
// import { data, useNavigate } from 'react-router-dom';
// function Home() {
//   const [users, setUsers] = useState("");
//   const [messages, setMessages] = useState([]);
// const navigate = useNavigate();

//   useEffect(() => {
//     const session = JSON.parse(localStorage.getItem("userSession"))
//     if (!session) {
//         navigate("/login");
//         return;
//     }
//     fetchUser();
//   }, []);

//   async function fetchUser() {
//     const { data , error } = await supabase.from("users").select("id, email, created_at");
   
//     if (error ) {
//         console.error("Error fetching users:", error.message);
       
//         return;
//     }
//          setUsers(data || []);
//          console.log(data);
         
//     // const user = data.session.user; // Extract user object properly
//     // if (user) {
//     //     console.log("User email:", user.email);
//     //     console.log("User details:", user); // Debugging
//     //     setUsers(user.email);
//     //   }
   
   
//   }

//   return (
//     <div>
//       <h2>Welcome, {data.email}</h2>
//       {/* <MessageForm user={user} />
//       <MessageList user={user} /> */}
//     </div>
//   );
// }
// export default Home;


// import { useEffect, useState } from "react";
// import supabase from "../config/supabaseClient";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [userEmail, setUserEmail] = useState("");
//   const navigate = useNavigate();

// //   useEffect(() => {
// //     const session = JSON.parse(localStorage.getItem("userSession")); // Ensure session is stored
// //     if (!session) {
// //       navigate("/login");
// //       return;
// //     }
// //     fetchUser();
// //   }, []);
// useEffect(() => {
//     fetchUser();
//   }, []);

//   async function fetchUser() {
//     // Get currently logged-in user's session
//     const { data, error } = await supabase.auth.getSession();

//     if (error || !data?.user) {
//       console.error("No active session:", error?.message);
//     //    navigate("/login"); // Redirect if no session
//        return
//     }

//     const userId = data.user.id; // Get logged-in user ID
//    console.log(userId);
   
//     // Fetch user data from the "users" table
//     const { data: userData, error: userError } = await supabase
//       .from("users")
//       .select("email")
//       .eq("id", userId)
//       .single(); // Use .single() to get one object instead of an array

//     if (userError) {
//       console.error("Error fetching user:", userError.message);
//       return;
//     }
   
    
//     setUserEmail(userData.email); // Set user email
//   }

//   return (
//     <div>
//       <h2>Welcome, {userEmail ? userEmail : "Loading..."}</h2>
//     </div>
//   );
// }

// export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MessageList from "../components/MessageList";
import RandomUsersList from "../components/RandomUsersList";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userSession"));

    if (!session) {
      navigate("/login");
      return;
    }

    setUser(session);
  }, []);

  function handleLogout() {
    localStorage.removeItem("userSession");
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="font-bold text-2xl">Let's Talk</h1>

      {user ? (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl">Welcome, {user.full_name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p><strong>Email:</strong> {user.email}</p>
            <Button className="mt-2" variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}

      {/* Message Section - Side by Side Layout */}
      <div className="flex w-full max-w-4xl gap-6">
        {/* Left Side - Random Users & Message Input */}
        <div className="w-1/2 flex flex-col gap-4">
          {user && <RandomUsersList user={user} />}
        </div>

        {/* Right Side - Message List */}
        <div className="w-1/2">
          {user && <MessageList user={user} />}
        </div>
      </div>
    </div>
  );
}

export default Home;







