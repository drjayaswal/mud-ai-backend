import { Elysia } from "elysia";
import {
  UserUpdateApiKeyBody,
  UserUpdateUsernameBody,
  type PayloadInterface,
} from "../types/user.type";
import {
  UpdateApiKey,
  UpdateUsername,
  Contact,
  Connect,
} from "../services/user.service";
import { decrypt } from "../lib/helper";
import { UserContactBody, UserConnectBody } from "../types/user.type";

export const routes = new Elysia({ prefix: "/user" })
  .state({ username: "", ucode: "" })
  .guard(
    {
      beforeHandle: async ({ cookie, set, store }) => {
        if (typeof cookie === "undefined") {
          set.status = 400;
          return {
            code: 400,
            success: false,
            message: "Missing cookies",
          };
        }

        if (!cookie.session) {
          set.status = 401;
          return {
            code: 401,
            success: false,
            message: "Missing session cookie",
          };
        }

        const session_string = cookie.session.value;
        if (!session_string) {
          set.status = 401;
          return {
            code: 401,
            success: false,
            message: "Session Expired",
          };
        }

        let payload: PayloadInterface;
        try {
          payload = (await decrypt(session_string)) as PayloadInterface;
        } catch (err) {
          set.status = 401;
          return {
            code: 401,
            success: false,
            message: "Invalid or expired session token",
          };
        }
        store.username = payload.user.username;
        store.ucode = payload.user.ucode;
      },
    },
    (app) =>
      app
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
            const response = await UpdateUsername(
              body.username,
              body.new_username
            );
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
        )
  );
