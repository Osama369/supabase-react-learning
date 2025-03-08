// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from "../config/supabaseClient";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// function AdminPanel() {
//   const [contacts, setContacts] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const session = JSON.parse(localStorage.getItem("supabaseSession"));
//     if (!session) {
//       navigate("/login");
//       return;
//     }
//     fetchContacts();
//   }, []);

//   async function fetchContacts() {
//     const { data, error } = await supabase.from("contacts").select();
//     if (error) {
//       console.error("Error fetching contacts:", error.message);
//       return;
//     }
//     setContacts(data || []);
//   }

//   async function addContact() {
//     const { data, error } = await supabase.from("contacts").insert([{ name, email }]).select();
//     if (error) {
//       console.error("Error adding contact:", error.message);
//       return;
//     }
//     setContacts([...contacts, ...data]);
//     setName("");
//     setEmail("");
//   }

//   async function updateContact() {
//     const { error } = await supabase.from("contacts").update({ name, email }).eq("id", editingId);
//     if (error) {
//       console.error("Error updating contact:", error.message);
//       return;
//     }
//     setContacts(contacts.map(c => (c.id === editingId ? { id: editingId, name, email } : c)));
//     setEditingId(null);
//     setName("");
//     setEmail("");
//   }

//   async function deleteContact(id) {
//     const { error } = await supabase.from("contacts").delete().eq("id", id);
//     if (error) {
//       console.error("Error deleting contact:", error.message);
//       return;
//     }
//     setContacts(contacts.filter(c => c.id !== id));
//   }

//   async function logout() {
//     await supabase.auth.signOut();
//     localStorage.removeItem("supabaseSession");
//     navigate("/login");
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Admin CMS - Contacts</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex space-x-2">
//             <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//             <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//             {editingId ? (
//               <Button onClick={updateContact}>Update</Button>
//             ) : (
//               <Button onClick={addContact}>Add</Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Contact List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                   <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {contacts.map((contact) => (
//                 <TableRow key={contact.id}>
//                   <TableCell>{contact.name}</TableCell>
//                   <TableCell>{contact.email}</TableCell>
//                   <TableCell>
//                     <Button variant="secondary" onClick={() => {
//                       setEditingId(contact.id);
//                       setName(contact.name);
//                       setEmail(contact.email);
//                     }}>
//                       Edit
//                     </Button>
//                     <Button variant="destructive" onClick={() => deleteContact(contact.id)}>
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Button variant="outline" onClick={logout} className="w-full">
//         Logout
//       </Button>
//     </div>
//   );
// }

// export default AdminPanel;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [adminEmail, setAdminEmail] = useState(""); // Store admin email
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("supabaseSession"));
    if (!session) {
      navigate("/login");
      return;
    }
    fetchAdmin();
    fetchUsers();
  }, []);

  async function fetchAdmin() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching admin details:", error.message);
      return;
    }
    if (user) setAdminEmail(user.email);
  }

  async function fetchUsers() {
    const { data, error } = await supabase.from("users").select("id, email, created_at");
    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }
    setUsers(data || []);
  }

  async function deleteUser(id) {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error.message);
      return;
    }
    setUsers(users.filter(user => user.id !== id));
  }

  async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("supabaseSession");
    navigate("/login");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel - Registered Users</CardTitle>
          <h1>Welcome!{adminEmail}</h1>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={logout} className="w-full">
        Logout
      </Button>
    </div>
  );
}

export default AdminPanel;

