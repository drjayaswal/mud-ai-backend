import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
export async function sendEmail(
  subject: string,
  html: string,
  context: string
) {
  const info = await transporter.sendMail({
    from: `Mud - ${context} Request`,
    to: process.env.GMAIL_USER!,
    subject,
    html,
  });
  return info;
}
