import { Elysia } from "elysia";
import { ConnectionBody } from "../types/connection.type";
import { decrypt } from "../lib/helper";
import type { PayloadInterface } from "../types/user.type";
import {
  CreateConnection,
  GetConnections,
} from "../services/connection.service";

export const routes = new Elysia({ prefix: "/connection" })
  .state({ username: "", ucode: "" })
  .guard(
    {
      beforeHandle: async ({ cookie, set, store }) => {
        console.log(cookie);
        if (typeof cookie === "undefined") {
          set.status = 400;
          return {
            code: 400,
            success: false,
            message: "Missing cookies",
          };
        }
        console.log(cookie.session);
        if (!cookie.session) {
          set.status = 401;
          return {
            code: 401,
            success: false,
            message: "Missing session cookie",
          };
        }

        console.log(cookie.session?.value);
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
          "/send",
          async ({ body, set, store }) => {
            const response = await CreateConnection(
              store.username,
              body.prompt
            );
            set.status = response.code;
            if (response.success && response.data) {
              return {
                success: response.success,
                code: response.code,
                message: response.message,
                data: response.data,
              };
            }
            return {
              success: response.success,
              code: response.code,
              message: response.message,
            };
          },
          {
            body: ConnectionBody,
          }
        )
        .get(
          "/all",
          async ({ set, store }) => {
            try {
              const response = await GetConnections(store.username);
              set.status = response.code;
              if (response.success && response.data) {
                return {
                  success: response.success,
                  code: response.code,
                  message: response.message,
                  data: response.data,
                };
              }
              return {
                success: response.success,
                code: response.code,
                message: response.message,
              };
            } catch (err) {
              set.status = 500;
              console.error("Error in /all:", err);
              return {
                success: false,
                code: 500,
                message: "Internal server error",
              };
            }
          },
          {
            body: ConnectionBody,
          }
        )
  );
