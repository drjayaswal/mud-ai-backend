import { eq } from "drizzle-orm";
import db from "../config/db.config";
import { generate_id } from "../lib/helper";
import { connection_model } from "../models/connection.model";

export const CreateConnection = async (username: string, prompt: string) => {
  try {
    const id = await generate_id();
    const response = `Hello ${username} !`;

    await db
      .insert(connection_model)
      .values({
        id,
        username,
        prompt,
        response,
      })
      .returning();

    return {
      success: true,
      code: 200,
      message: "Connection Created Successfully",
      data: {
        prompt,
        response,
      },
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR: CreateConnection failed",
    };
  }
};
export const GetConnections = async (username: string) => {
  try {
    const connections = await db
      .select({
        username: connection_model.username,
        prompt: connection_model.prompt,
        response: connection_model.response,
        created_at: connection_model.created_at,
      })
      .from(connection_model)
      .where(eq(connection_model.username, username));
    return {
      success: true,
      code: 200,
      message: "Connections Fetched Successfully",
      data: connections,
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR: GetConnections failed",
    };
  }
};
