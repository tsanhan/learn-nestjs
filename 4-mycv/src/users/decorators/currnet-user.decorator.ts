import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrnetUser = createParamDecorator(
    // ExecutionContext is the request, but is called context execution context because it can be used in other contexts like websockets grpc etc
    (data: never, ctx: ExecutionContext) => {
        const http = ctx.switchToHttp();
        const request = http.getRequest();
        return request.currentUser; // currentUser is set in the CurrentUserInterceptor
    }
);