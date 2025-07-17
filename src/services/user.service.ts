import db from "../config/db.config";
import { user_model } from "../models/user.model";
import { generate_id, hash_password, compare_password } from "../lib/helper";
import { eq } from "drizzle-orm";
import { contact_model } from "../models/contact.model";
import { connect_model } from "../models/connect.model";
import { sendEmail } from "../lib/mailer";

export const CreateUser = async (
  ucode: string,
  username: string,
  password: string
) => {
  const hashed_password = await hash_password(password);
  try {
    const id = await generate_id();
    await db
      .insert(user_model)
      .values({
        id: id,
        username: username,
        ucode: ucode,
        hashed_password: hashed_password,
      })
      .returning();

    console.log(
      `[SERVER]  :  User Created Successfully  :  ${new Date().toLocaleString()}`
    );
    return {
      success: true,
      code: 200,
      message: "User Created Successfully",
    };
  } catch (error: any) {
    if (error.cause.code === "23505") {
      return {
        success: false,
        code: 409,
        message: "Username Already Exists",
      };
    } else {
      return {
        success: false,
        code: 409,
        message: "ERROR : create_user",
      };
    }
  }
};

export const LoginUser = async (username: string, password: string) => {
  try {
    const user = await db
      .select()
      .from(user_model)
      .where(eq(user_model.username, username));
    if (!user || user.length === 0) {
      return {
        success: false,
        code: 404,
        message: "User not found",
      };
    }
    const foundUser = user[0];
    if (!foundUser || !foundUser.hashed_password) {
      return {
        success: false,
        code: 404,
        message: "User not found or password not set",
      };
    }
    const isMatch = await compare_password(password, foundUser.hashed_password);
    if (!isMatch) {
      return {
        success: false,
        code: 401,
        message: "Invalid password",
      };
    }
    return {
      success: true,
      code: 200,
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR : login_user",
    };
  }
};

export const UpdateApiKey = async (username: string, key: string) => {
  try {
    const result = await db
      .update(user_model)
      .set({ api_key: key })
      .where(eq(user_model.username, username))
      .returning({ username: user_model.username });
    if (result && result.length > 0) {
      return {
        success: true,
        code: 200,
        message: "API key updated successfully",
      };
    } else {
      return {
        success: false,
        code: 404,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR : update_api_key",
    };
  }
};
export const UpdateUsername = async (
  username: string,
  new_username: string
) => {
  try {
    await db
      .update(user_model)
      .set({ username: new_username })
      .where(eq(user_model.username, username))
      .returning({ username: user_model.username });
    return {
      success: true,
      code: 200,
      message: "Username updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR : update_username",
    };
  }
};
export const Contact = async (email: string, message: string) => {
  try {
    const id = await generate_id();
    await db
      .insert(contact_model)
      .values({ id: id, email: email, message: message });
    const htmlContent = `
      <div style="background: #f8fafc; min-height: 100vh; padding: 0; font-family: 'Segoe UI', 'Roboto', Arial, sans-serif; color: #64748b;">
        <div style="max-width: 420px; margin: 48px auto; padding: 32px 24px; border-radius: 10px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 32px; color: #64748b;">Contact Request</h1>
          <div style="margin-bottom: 20px;">
            <span style="font-size: 15px; color: #64748b;">${email}</span>
          </div>
          <div style="margin-bottom: 36px;">
            <span style="display: block; font-size: 15px; color: #64748b; white-space: pre-line;">${message}</span>
          </div>
          <div style="margin-top: 40px;">
            <span style="font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} Mud. All rights reserved.</span>
          </div>
        </div>
      </div>
    `;
    await sendEmail("Mud - Contact Request", htmlContent, "Contact");
    return {
      success: true,
      code: 200,
      message: "Contact sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR : contact",
    };
  }
};
export const Connect = async (email: string, message: string) => {
  try {
    const id = await generate_id();
    await db
      .insert(connect_model)
      .values({ id: id, email: email, message: message });
    const htmlContent = `
      <div style="background: #f8fafc; min-height: 100vh; padding: 0; font-family: 'Segoe UI', 'Roboto', Arial, sans-serif; color: #64748b;">
        <div style="max-width: 420px; margin: 48px auto; padding: 32px 24px; border-radius: 10px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 32px; color: #64748b;">Connect Request</h1>
          <div style="margin-bottom: 20px;">
            <span style="font-size: 15px; color: #64748b;">${email}</span>
          </div>
          <div style="margin-bottom: 36px;">
            <span style="display: block; font-size: 15px; color: #64748b; white-space: pre-line;">${message}</span>
          </div>
          <div style="margin-top: 40px;">
            <span style="font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} Mud. All rights reserved.</span>
          </div>
        </div>
      </div>
    `;
    await sendEmail("Mud - Connect Request", htmlContent, "Connect");
    return {
      success: true,
      code: 200,
      message: "Contact sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "ERROR : contact",
    };
  }
};
