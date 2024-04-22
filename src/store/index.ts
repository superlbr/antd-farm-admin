import { createStore } from 'redux';

export interface GlobalState {
	settings: Record<string, any>;
	userInfo?: {
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
		lang: 'en-US',
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
		  icon: 'laptop',
		  name: '首页',
		  children: [{
			id: 2,
			level: 2,
			name: '监控页',
			router: '/dashboard/monitor',
		  }]
		},
	  ],
    permissions: [],
};

function rootReducer(state = initialState, action: { type: string; payload: any; }) {
	switch (action.type) {
		case "updateState": {
			const { key, params } = action.payload;

            return {
                ...state,
                [key]: {
                    ...state[key],
                    ...params
                }
            };
		}

		default:
			return state;
	}
}

const store = createStore(rootReducer);

export default store