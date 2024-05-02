import setupMock from "@/utils/setupMock";
import Mock from "mockjs";

setupMock({
    setup: () => {
        Mock.mock(new RegExp("/api/v1/user/login"), () => {

            return {
                success: true,
                data: {
                    route_default: "/dashboard",
                }
            };
        });
    }
});