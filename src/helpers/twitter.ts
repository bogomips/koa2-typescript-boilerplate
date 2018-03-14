import * as request from 'request-promise-native';
import config from 'config';

interface Twitter {
  getToken:Function
}

const tw:Twitter = {};

tw.getToken = async () => {

  try {

    const encode_secret = new Buffer(`${config.twitter.apiKey}:${config.twitter.apiSecret}`).toString('base64');

    const options = {
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Authorization': 'Basic ' + encode_secret,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
      body: 'grant_type=client_credentials'
    };

    const responsePlain = await request.post(options);
    return JSON.parse(responsePlain);
  }

  catch(e) {
    
    switch (e.statusCode) {
      case 403:
        console.log('Error 403, Please check the twitter setting in your config file');
      break;
    }

    return e.statusCode;

  }

}

export { tw };