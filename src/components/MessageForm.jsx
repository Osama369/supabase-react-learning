import { useState } from "react";
import supabase from "../config/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function MessageForm({ user }) {
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessages] = useState("");

  async function sendMessage() {
    if (!receiverId || !message) return alert("Please enter all fields");

    const { error } = await supabase.from("messages").insert([
      { sender_id: user.id, receiver_id: receiverId, message },
    ]);

    if (error) {
      console.error("Error sending message:", error.message);
      alert("Failed to send message");
    } else {
      setMessages("");
      alert("Message sent successfully!");
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">Send a Confession</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessages(e.target.value)}
        />
        <Button className="mt-2" onClick={sendMessage}>
          Send
        </Button>
      </CardContent>
    </Card>
  );
}

export default MessageForm;
