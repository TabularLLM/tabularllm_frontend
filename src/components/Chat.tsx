'use client'
import React, { useState } from 'react'
import { toast } from "sonner"
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import Messages from "./Messages";
import { useRouter } from 'next/navigation'

export type messageType = {
    type: string;
    message: string;
};

interface ChatProps{
    chat: messageType[]
    insight_id: number
}

function Chat( { chat, insight_id }: ChatProps ) {
    const router = useRouter()
    const [messages, setMessages] = useState<messageType[]>(chat);
    const [message, setMessage] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false)

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        setSending(true)
        setMessages([{message: message, type: 'input'}, ...messages])

        const data = {
            insight_id: insight_id,
            message: message
        }

        toast.promise(axios.post("https://tabularllm-api-hyf9apbmf0dxc4ef.canadacentral-01.azurewebsites.net/chat/", data, {
            headers: {
                "Content-Type": "application/json",
            },
            }), {
            loading: 'Waiting for response...',
            success: (data) => {
                console.log("Message sent successfully:", data.data);

                setMessages((messages) => [{message: data.data, type: 'ouput'}, ...messages])
                setMessage("");
                setSending(false);
                
                router.refresh();
                return 'Message has been sent';
            },
            error: (error) => {
                console.error("Error sending message:", error);
                const temp = messages
                temp.pop()
                setMessages([...temp])
                setSending(false);
                return 'Error sending message';
            }
        });
    }

    return (
        <div className='w-full'>
            <Messages messages={messages} size="h-[440px]"/> 
            <div className="flex flex-col space-y-1 px-72">
                <div className="flex space-x-2">
                <Input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    className="flex-1 border border-[#77878B] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#305252]"
                    onChange={handleMessageChange}
                    disabled={sending}
                />
                <Button className="border border-[#BEBEBE] bg-[#F8F9F7] text-[#767676] font-bold text-sm hover:text-white" onClick={handleSendMessage} disabled={sending}>Send</Button>
                </div>
            </div>    
        </div>
    )
}

export default Chat