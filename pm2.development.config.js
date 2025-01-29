module.exports = {
  apps: [
    {
      name: "front",
      cwd: "./packages/front",
      script: "node",
      args: "../../node_modules/next/dist/bin/next dev",
      exec_mode: "fork_mode",
      max_memory_restart: "1G",
    },
    {
      name: "server",
      cwd: "./packages/server",
      max_memory_restart: "1G",
      instances: 1,
      script: "node",
      args: "../../node_modules/@nestjs/cli/bin/nest.js start --watch",
      exec_mode: "fork_mode",
    },
  ],
};
