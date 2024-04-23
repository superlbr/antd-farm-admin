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
    permissions: string[];
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
		  router: '/dashboard/monitor',
		},
		{
			id: 2,
			level: 1,
			icon: 'user',
			name: '用户',
			children: [{
			  id: 3,
			  level: 2,
			  name: '用户列表',
			  router: '/user/list',
			}]
		  },
	  ],
    permissions: [],
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

		default:
			return state;
	}
}

const store = createStore(rootReducer);

export default store
