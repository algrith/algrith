module.exports = {
  apps: [
    {
      name: "nextjs",
      script: "node",
      args: "server.js", // Next.js standalone server
      env: { PORT: 3000, NODE_ENV: "production" },
    },
    {
      name: "socket",
      script: "npx",
      args: "tsx socket-server/index.ts",
      env: { PORT: 3001, NODE_ENV: "production" },
    },
  ],
};
