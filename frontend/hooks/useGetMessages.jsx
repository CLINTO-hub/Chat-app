import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import UseConversation from "../src/components/zustand/useConversation.js";
import { BASE_URL } from "../config.js";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = UseConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
                const token = localStorage.getItem("chat-user") ? JSON.parse(localStorage.getItem("chat-user")).token : null;

				const res = await fetch(`${BASE_URL}/messages/${selectedConversation._id}`,{
                    headers:{'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                });
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
