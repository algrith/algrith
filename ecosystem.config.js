module.exports = {
  apps: [
    {
      args: "server.js",
      name: "nextjs",
      script: "node",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      args: "tsx --env-file=./.env socket-server/index.ts",
      name: "socket",
      script: "npx",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
