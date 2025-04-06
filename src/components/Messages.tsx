import { messageType } from "./Chat";

interface MessagesProps{
  messages: messageType[]
  size: string
}

function Messages({ messages, size }: MessagesProps) {

  const formatMarkdown = (text: string) => {
  
    // Replace bold (**text**) with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace ### headings with <h3>
    text = text.replace(/###\s(.+)/g, "<h3 class='text-md font-semibold mt-3'>$1</h3>");
  
    // Replace headings (## Title) with <h2>
    text = text.replace(/##\s(.+)/g, "<h2 class='text-lg font-bold mt-4'>$1</h2>");

    return text;
  };

  return (
    <div className={`${size} w-full overflow-y-auto flex flex-col-reverse scrollbar pb-2 px-72`}>
      {messages.length === 0 ? (
        <p className="text-sm text-gray-700 self-start px-1 py-2">Ask GPT anything about your data!</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'input' ? 'justify-end' : 'justify-start'}`}>
            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.message) }} className={`text-sm rounded-md shadow-md mb-2 px-3 py-2 w-fit break-words max-w-[90%] whitespace-pre-wrap ${msg.type === 'input' ? 'bg-[#F8F9F7] text-[#767676] border border-[#BEBEBE]' : 'bg-white text-gray-700'}`}/>
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
