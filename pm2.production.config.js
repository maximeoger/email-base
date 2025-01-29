module.exports = {
  apps: [
    {
      name: "front",
      cwd: "./packages/front",
      script: "node",
      args: "../../node_modules/next/dist/bin/next start",
      exec_mode: "fork_mode",
      max_memory_restart: "1G",
      instances: 1
    },
    {
      name: "server",
      cwd: "./packages/server",
      script: "node",
      args: "../../node_modules/@nestjs/cli/bin/nest.js start",
      exec_mode: "fork_mode",
      max_memory_restart: "1G",
      instances: 1
    },
  ],
};
