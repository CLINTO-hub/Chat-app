import { useState } from "react";
import { useAuthContext } from "../src/components/context/AuthContext.jsx";
import {toast} from 'react-toastify'
import { BASE_URL } from "../config.js";


const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setauthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/auth/logout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setauthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
