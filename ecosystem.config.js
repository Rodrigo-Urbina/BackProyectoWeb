module.exports = {
  apps : [
    // {
    //   script: 'proxy/app.js',
    //   watch: './proxy'
    // }, 
    {
      name: 'strapi',
      script: 'npm',
      cwd: './strapi/',
      args: 'run develop'
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