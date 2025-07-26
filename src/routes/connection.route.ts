import { Elysia } from "elysia";
import { ConnectionBody, ConnectionsBody } from "../types/connection.type";
import {
  CreateConnection,
  GetConnections,
} from "../services/connection.service";

export const routes = new Elysia({ prefix: "/connection" })
  .post(
    "/send",
    async ({ body, set }) => {
      const response = await CreateConnection(body.username, body.prompt);
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
  .post(
    "/all",
    async ({ body, set }) => {
      try {
        const response = await GetConnections(body.username);
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
      body: ConnectionsBody,
    }
  );
