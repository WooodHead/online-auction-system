import React from 'react';
import { useLocation } from 'react-router-dom';
import Chat from '../../UI/Chat/Chat';

import AdminDashboard from '../AdminDashboard/home/adminDashboard';

const ChatWithAgent = () => {
	return (
		<AdminDashboard>
			<Chat />
		</AdminDashboard>
	);
};

export default ChatWithAgent;
