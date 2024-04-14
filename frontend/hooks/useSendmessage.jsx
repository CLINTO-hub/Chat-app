import { useState } from "react";

import {toast} from "react-toastify";
import { BASE_URL } from "../config";
import UseConversation from "../src/components/zustand/useConversation.js";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = UseConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const token = localStorage.getItem("chat-user") ? JSON.parse(localStorage.getItem("chat-user")).token : null;
			const res = await fetch(`${BASE_URL}/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
