import setupMock from "@/utils/setupMock";
import Mock from "mockjs";

let usersList = Mock.mock({
	"data|8-12": [
		{
			"id|+1": 1,
			avatar: "@image('100x100', '@color', 'Hi')",
			name: "@cname",
			nickName: "@last",
			"age|18-60": 1,
			isMale: '@boolean',
			phone: /^1[385][1-9]\d{8}/,
			"email": "@EMAIL",
			"address": "@county(true)",
			createTime:'@datetime'
		}
	]
});

setupMock({
	setup: () => {
		Mock.mock(new RegExp("/api/v1/users"), () => {

			return {
				list: usersList.data,
				total: usersList.data.length
			};
		});
		Mock.mock(new RegExp("/api/v1/user/update"), (options) => {
			const body = JSON.parse(options.body);
			const id = options.url.split('/').pop();

			for (let i = 0; i < usersList.data.length; i++) {
				if (usersList.data[i].id == id) {
					usersList.data[i] = { ...usersList.data[i], ...body };
					break;
				}
			}

			return true;
		});

		Mock.mock(new RegExp("/api/v1/user/delete"), (options) => {
			const id = options.url.split('/').pop();

			usersList.data = usersList.data.filter(item => item.id != id);

			return true;
		});
	}
});
