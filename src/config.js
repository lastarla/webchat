export const model = {
	online: false, 			// 是否登录在线
	connected: false, 		// 建立沟通
	userId: '', 			// 用户id
	targetUserId: '', 		// 沟通对象id
	chatList: {}, 			// 聊天内容列表
	ws: null,				// websocket对象
}

export const pathName = {
	SIGNIN: '/signin',
	SIGNUP: '/signup',
	SIGNOUT: '/signout',
	FRIENDS: '/friends',
	CHAT: '/chat'
}