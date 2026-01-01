module.exports = {
  apps: [
    {
      name: "gateway-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      cwd: "../upch-simulation-CLIENT-GATEWAY",
      windowsHide: true,
      env: {
        PORT: 4000,
        NODE_ENV: "development",
      },
    },
    {
      name: "auth-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      cwd: "../upch-simulation-AUTH-MS",
      windowsHide: true,
      env: {
        PORT: 4010,
        NODE_ENV: "development",
      },
    },
    {
      name: "stomatology-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      cwd: "../upch-simulation-STOMATOLOGY-MS",
      windowsHide: true,
      env: {
        PORT: 4020,
        NODE_ENV: "development",
      },
    },
    {
      name: "engineering-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      cwd: "../upch-simulation-ENGINEERING-MS",
      windowsHide: true,
      env: {
        PORT: 4030,
        NODE_ENV: "development",
      },
    },
    {
      name: "stomatology-websocket",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      cwd: "../upch-simulation-STOMATOLOGY-WS",
      windowsHide: true,
      env: {
        PORT: 5000,
        NODE_ENV: "development",
      },
    },
  ],
};
