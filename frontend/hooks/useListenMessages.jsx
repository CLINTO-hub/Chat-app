import { useEffect } from "react";
import UseConversation from "../src/components/zustand/useConversation";
import { useSocketContext } from "../src/components/context/SocketContext";
import notificationSound from "../../frontend/src/assets/sounds/notification.mp3"

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = UseConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
			const sound = new Audio(notificationSound)
            sound.play()
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
