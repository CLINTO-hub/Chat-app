import useGetConversations from "../../../hooks/useConversations";
import useConversation from "../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
	const {loading,conversations} = useGetConversations();
	console.log('Converstions',conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation)=>(
				<Conversation 
				key={conversation._id}
				conversation={conversation}
				/>
			))}

			{loading ? <span className="loading loading-spinner mx-auto"></span>:null}
		</div>
	);
};
export default Conversations;