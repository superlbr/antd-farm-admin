import setupMock from "@/utils/setupMock";
import Mock from "mockjs";

let notificationList = Mock.mock({
	"data|1-2": [
		{
			"id|+1": 1,
			content: "@name",
			level: "@integer(0, 1)",
			status: "@integer(0, 1)",
			createTime:'@datetime'
		}
	]
});

setupMock({
	setup: () => {
		Mock.mock(new RegExp("/api/v1/admin/notifications"), () => {

			const newList = notificationList.data.filter(x => x.status == 1)
			return {
				list: newList,
				total: newList.length
			};
		});
		Mock.mock(new RegExp("/api/v1/admin/notification/update"), (options) => {
			const body = JSON.parse(options.body);
			const id = options.url.split('/').pop();

			for (let i = 0; i < notificationList.data.length; i++) {
				if (notificationList.data[i].id == id) {
					notificationList.data[i] = { ...notificationList.data[i], ...body };
					break;
				}
			}

			return true;
		});
	}
});
