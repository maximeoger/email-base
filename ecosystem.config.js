module.exports = {
  apps : [{
    name: "front",
    script: "yarn run dev",
    cwd: "front",
    watch: true,
  }, {
    name: "server",
    script: "yarn run start",
    cwd: "server",
    watch: true,
  }],
};
