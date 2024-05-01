import { createStore } from 'redux';

export interface GlobalState {
	settings: Record<string, any>;
	userInfo: {
		uid?: number;
		name?: string;
		avatar?: string;
		route_default?: string;
	};
	routeList: Record<string, any>[];
	permissions: number[];
}

const initialState: GlobalState = {
	settings: {
		isMobile: false,
		theme: "light",
		collapsed: false,
	},
	userInfo: {
	},
	routeList: [
		{
			id: 1,
			level: 1,
			icon: 'dashboard',
			name: '首页',
			route: '/dashboard',
		},
		{
			id: 2,
			level: 1,
			icon: 'user',
			name: '用户',
		},
		{
			id: 3,
			bpid: 2, // parent id
			mpid: 2, // determine whether menu rendered
			level: 2,
			name: '用户列表',
			route: '/user',
		}
	],
	permissions: [1, 2, 3],
};

function rootReducer(state = initialState, action: { type: string; payload: any; }) {
	switch (action.type) {
		case "updateSetting": {
			return {
				...state,
				settings: {
					...state.settings,
					...action.payload
				}
			};
		}

		case "login": {
			localStorage.setItem('userStatus', 'login')
			return {
				...state,
				userInfo: {
					...action.payload
				}
			}
		}

		case "logout": {
			localStorage.setItem('userStatus', 'logout')
			return {
				...state,
				userInfo: {}
			}
		}

		default:
			return state;
	}
}

const store = createStore(rootReducer);

export default store
