import { Server } from "oc-server";

export const server = new Server((params: { name: string }, context) => {
  const { name } = params;
  const { staticPath } = context;

  return {
    name,
    staticPath,
  };
});
