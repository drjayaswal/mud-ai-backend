import { t } from "elysia";

export const UserCreateBody = t.Object({
  username: t.String(),
  password: t.String(),
  ucode: t.String(),
});
export const UserLoginBody = t.Object({
  username: t.String(),
  password: t.String(),
});
export const UserUpdateApiKeyBody = t.Object({
  username: t.String(),
  key: t.String(),
});
export const UserUpdateUsernameBody = t.Object({
  username: t.String(),
  new_username: t.String(),
});
export const UserContactBody = t.Object({
  email: t.String(),
  message: t.String(),
});
export const UserConnectBody = t.Object({
  email: t.String(),
  message: t.String(),
});
