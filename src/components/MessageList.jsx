import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

function MessageList({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sender_id, message, created_at")
        .eq("receiver_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching messages:", error);
      else setMessages(data || []);
    }
    
    fetchMessages();
  }, [user]);

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li key={msg.id} className="border p-2 rounded-lg">
                <strong>From:</strong> {msg.sender_id} <br />
                <span>{msg.message}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default MessageList;
