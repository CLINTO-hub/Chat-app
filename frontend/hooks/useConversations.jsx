import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { BASE_URL } from "../config.js";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                // Retrieve token from local storage
                const token = localStorage.getItem("chat-user") ? JSON.parse(localStorage.getItem("chat-user")).token : null;
				console.log('tooo',token);

                const res = await fetch(`${BASE_URL}/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
