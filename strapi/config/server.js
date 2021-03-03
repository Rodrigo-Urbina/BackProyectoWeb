module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e5d5910f965f1e43bb7bb8d5daa0ad84'),
    },
  },
});
