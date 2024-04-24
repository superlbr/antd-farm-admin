import setupMock from "@/utils/setupMock";
import Mock from "mockjs";

const usersList = Mock.mock({
	"data|4-6": [
		{
			"id|+1": 1,
			nickName: "用户7352772",
			age: 18,
			isMale: true,
		}
	]
});

setupMock({
	setup: () => {
		Mock.mock(new RegExp("/api/v1/users"), () => {

			return {
				list: usersList.data,
				total: 4
			};
		});
		Mock.mock(new RegExp("/api/v1/user/update/:id"), (options) => {
			console.log(options)
			return {
				list: usersList.data,
				total: 4
			};
		});
	}
});
