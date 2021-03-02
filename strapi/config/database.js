module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', 'labweb.cy4vghshg6p9.us-east-2.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'labWeb'),
        username: env('DATABASE_USERNAME', 'admin'),
        password: env('DATABASE_PASSWORD', 'forwyZ-cuvnoz-qucca8'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
