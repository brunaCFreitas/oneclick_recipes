module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/dtos',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/database/models',
    'src/app.ts',
    'src/server.ts'
  ],
  include: ['src/**/*.ts']
};
