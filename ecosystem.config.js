module.exports = {
  apps: [
    {
      args: "server.js",
      name: "nextjs",
      script: "node",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      args: "tsx --env-file=./.env socket-server/index.ts",
      name: "socket",
      script: "npx",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
