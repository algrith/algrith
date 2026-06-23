module.exports = {
  apps: [
    {
      args: "server.js",
      name: "nextjs",
      script: "node",
      env: {
        PORT: process.env.PORT || 3000,
        NODE_ENV: "production",
      },
    },
    // {
    //   args: "tsx --env-file=./.env socket-server/index.ts",
    //   name: "socket",
    //   script: "npx",
    //   env: {
    //     NODE_ENV: "production",
    //     PORT: 3001,
    //   },
    // },
  ],
};
