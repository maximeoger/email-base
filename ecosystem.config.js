module.exports = {
  apps : [{
    name: "front",
    script: "yarn run dev",
    cwd: "front",
  }, {
    name: "server",
    script: "yarn run start:dev",
    cwd: "server",
  }],
};
