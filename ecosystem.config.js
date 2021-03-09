module.exports = {
  apps : [
    // {
    //   script: 'proxy/app.js',
    //   watch: './proxy'
    // }, 
    {
      name: 'express-server',
      script: 'node',
      cwd: './node-app/',
      args: 'server.js'
    }
  ],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};