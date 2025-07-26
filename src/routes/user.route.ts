import { Elysia } from "elysia";
import {
  UserUpdateApiKeyBody,
  UserUpdateUsernameBody,
} from "../types/user.type";
import {
  UpdateApiKey,
  UpdateUsername,
  Contact,
  Connect,
} from "../services/user.service";
import { UserContactBody, UserConnectBody } from "../types/user.type";

export const routes = new Elysia({ prefix: "/user" })
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
