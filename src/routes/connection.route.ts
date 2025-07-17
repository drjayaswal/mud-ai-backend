import { Elysia } from "elysia";
import { ChatBody } from "../types/connection.type";

export const routes = new Elysia({ prefix: "/connection" }).post(
  "/send",
  async ({ body }) => {
    return { status: "Message received", data: body.message };
  },
  {
    body: ChatBody,
  }
);
