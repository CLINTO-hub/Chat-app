
import { useAuthContext } from "../context/AuthContext.jsx";
import UseConversation from "../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = UseConversation();
    const formattedTime = extractTime(message.createdAt);
    console.log('mess',message.createdAt);
    console.log('for',formattedTime);
    const fromMe = message.senderId === authUser.userId;

    const chatClassName = fromMe ? "chat-end" : "chat-start"; // Determine chat class based on whether the message is from the current user
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : ""; // Set background color for bubbles of messages from the current user
    const shakeClass = message.shouldShake ? "shake" : ""


    function extractTime(dateString) {
        const date = new Date(dateString);
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${hours}:${minutes}`;
    }

    function padZero(number) {
        return number.toString().padStart(2, "0");
    }
    

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};
export default Message;
