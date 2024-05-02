import setupMock from "@/utils/setupMock";
import Mock from "mockjs";

const userInfo = Mock.mock({
    'uid|1-100': 1,
    name: "@cname",
    route_default: "/dashboard",
})

setupMock({
    setup: () => {
        Mock.mock(new RegExp("/api/v1/user/login"), res => {
            console.log('res body login', res.body)

            return {
                success: true,
                data: userInfo
            };
        });
    }
});