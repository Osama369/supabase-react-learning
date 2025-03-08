// import { useEffect, useState } from "react";
// import supabase from "../config/supabaseClient";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// function RandomUsersList({ user }) {
//   const [randomUsers, setRandomUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     async function fetchRandomUsers() {
//       let { data, error } = await supabase
//         .from("users")
//         .select("id, full_name")
//         .neq("id", user.id)
//         .limit(5);

//       if (error) console.error(error);
//       setRandomUsers(data || []);
//     }
//     fetchRandomUsers();
//   }, [user]);

//   async function sendMessage() {
//     if (!selectedUser || !message) return;

//     const { error } = await supabase.from("messages").insert([
//       { sender_id: user.id, receiver_id: selectedUser.id, message },
//     ]);

//     if (error) {
//       console.error(error);
//       return;
//     }

//     alert("Message sent!");
//     setMessage("");
//     setSelectedUser(null);
//   }

//   return (
//     <Card className="w-full max-w-md shadow-lg mt-6">
//       <CardHeader>
//         <CardTitle className="text-center text-xl">Select a User to Message</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {randomUsers.length > 0 ? (
//             randomUsers.map((usr) => (
//               <Button
//                 key={usr.id}
//                 className="w-full"
//                 variant={selectedUser?.id === usr.id ? "default" : "outline"}
//                 onClick={() => setSelectedUser(usr)}
//               >
//                 {usr.full_name}
//               </Button>
//             ))
//           ) : (
//             <p className="text-center">No users found</p>
//           )}
//         </div>

//         {selectedUser && (
//           <div className="mt-4">
//             <Input
//               type="text"
//               placeholder={`Message ${selectedUser.full_name}`}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <Button className="w-full mt-2" onClick={sendMessage}>
//               Send Message
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// export default RandomUsersList;


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import supabase from "../config/supabaseClient";

function RandomUsersList({ user }) {
  const [randomUsers, setRandomUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  async function fetchRandomUsers() {
    let { data, error } = await supabase
      .from("users")
      .select("id, full_name")
      .neq("id", user.id); // Exclude logged-in user

    if (error) {
      console.error(error);
    } else {
      shuffleAndSetUsers(data);
    }
  }

  function shuffleAndSetUsers(users) {
    const shuffled = users.sort(() => 0.5 - Math.random()).slice(0, 2); // Pick 2 random users
    setRandomUsers(shuffled);
  }

  async function sendMessage() {
    if (!selectedUser || !message.trim()) return;

    let { error } = await supabase.from("messages").insert([
      {
        sender_id: user.id,
        receiver_id: selectedUser.id,
        message: message,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setMessage("");
      alert("Message sent!");
    }
  }

  return (
    <Card className="shadow-lg p-4 w-full">
      <CardContent className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-center">Random Users</h3>

        <div className="flex flex-col gap-2">
          {randomUsers.map((randomUser) => (
            <Button
              key={randomUser.id}
              variant={selectedUser?.id === randomUser.id ? "default" : "outline"}
              onClick={() => setSelectedUser(randomUser)}
            >
              {randomUser.full_name}
            </Button>
          ))}
        </div>

        {/* Refresh Random Users Button */}
        <Button className="mt-2" onClick={fetchRandomUsers}>
          🔄 Get New Users
        </Button>

        {/* Message Input for Selected User */}
        {selectedUser && (
          <div className="flex items-center gap-2 mt-4">
            <Input
              type="text"
              placeholder={`Message ${selectedUser.full_name}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RandomUsersList;


