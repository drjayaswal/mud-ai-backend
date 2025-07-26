import { t } from "elysia";

export const ConnectionBody = t.Object({
  prompt: t.String(),
  username: t.String(),
});
export const ConnectionsBody = t.Object({
  username: t.String(),
});
