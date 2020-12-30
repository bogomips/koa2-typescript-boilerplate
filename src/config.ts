
const config:any = {

  server: {
    address:'localhost',
    port:8888,
    cors: {
      allowedHeaders:'Origin, Content-Type, Authorization',
      allowedMethods:'GET,PUT,POST,DELETE,PATCH'
    },
    
    ssl: {
      cert: '/path/fullchain.pem',
      privkey: '/path/privkey.pem',
      active:false
    }
  },

  api: {
    prefix: '/v1'
  },

  twitter: {
    apiKey:'',
    apiSecret:''
  }
};

export default config;