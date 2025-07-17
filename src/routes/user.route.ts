import { Elysia, t } from "elysia";
import {
  UserCreateBody,
  UserLoginBody,
  UserUpdateApiKeyBody,
  UserUpdateUsernameBody,
  UserContactBody,
  UserConnectBody,
} from "../types/user.type";
import {
  CreateUser,
  LoginUser,
  UpdateApiKey,
  UpdateUsername,
  Contact,
  Connect,
} from "../services/user.service";

export const routes = new Elysia({ prefix: "/user" })
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
  .post(
    "/update-api-key",
    async ({ body, set }) => {
      const response = await UpdateApiKey(body.username, body.key);
      set.status = response.code;
      return {
        success: response.success,
        code: response.code,
        message: response.message,
      };
    },
    {
      body: UserUpdateApiKeyBody,
    }
  )
  .post(
    "/update-username",
    async ({ body, set }) => {
      const response = await UpdateUsername(body.username, body.new_username);
      set.status = response.code;
      return {
        success: response.success,
        code: response.code,
        message: response.message,
      };
    },
    {
      body: UserUpdateUsernameBody,
    }
  )
  .post(
    "/contact",
    async ({ body, set }) => {
      const response = await Contact(body.email, body.message);
      set.status = response.code;
      return {
        success: response.success,
        code: response.code,
        message: response.message,
      };
    },
    {
      body: UserContactBody,
    }
  )
  .post(
    "/connect",
    async ({ body, set }) => {
      const response = await Connect(body.email, body.message);
      set.status = response.code;
      return {
        success: response.success,
        code: response.code,
        message: response.message,
      };
    },
    {
      body: UserConnectBody,
    }
  );
