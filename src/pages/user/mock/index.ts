import setupMock from "@/utils/setupMock";
import Mock from "mockjs";

setupMock({
	setup: () => {
		Mock.mock(new RegExp("/api/v1/users"), () => {
			const data = Mock.mock({
				"data|4-6": [
					{
						"id|+1": 1,
						nickName: "用户7352772",
                        age: 18,
                        isMale: true,
					}
				]
			});

			return {
				list: data.data,
				total: 4
			};
		});
	}
});
