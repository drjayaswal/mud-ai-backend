import { Elysia } from "elysia";
import {
  UserCreateBody,
  UserLoginBody,
} from "../types/user.type";
import {
  CreateUser,
  LoginUser,
} from "../services/user.service";

export const routes = new Elysia({ prefix: "/auth" })
  .post(
    "/create",
    async ({ body, set }) => {
      const response = await CreateUser(
        body.ucode,
        body.username,
        body.password
      );
      set.status = response.code;
      return {
        success: response.success,
        code: response.code,
        message: response.message,
      };
    },
    {
      body: UserCreateBody,
    }
  )
  .post(
    "/login",
    async ({ body, set }) => {
      const response = await LoginUser(body.username, body.password);
      set.status = response.code;
      return {
        success: response.success,
        code: response.code,
        message: response.message,
      };
    },
    {
      body: UserLoginBody,
    }
  )
