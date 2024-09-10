module.exports = {
  apps : [
    {
      name: 'frontend', 
      cwd: './packages/front',  
      script: 'next',
      args: 'dev', 
      exec_mode: "fork_mode",
      max_memory_restart: "1G",
      interpreter: "bun",
    },
    {
      name: 'server',  
      cwd: './packages/server',
      max_memory_restart: "1G",
      instances: 1,
      script: 'nest',
      args: 'start --watch',
      exec_mode: "cluster",
      interpreter: "bun",
    }
  ],
};
