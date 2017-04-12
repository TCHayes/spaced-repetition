# Space Repetition Starter Kit

## Clone the repo

```sh
$ git clone https://github.com/bookcasey/spaced-repetition-starter
```

```sh
$ cd spaced-repetition-starter
```

```sh
$ npm install
```


## Google OAuth Credentials

Visit console.developers.google.com

Navigate: Library > Social APIs > Google+ API

Click 'Enable'

Click 'Create credentials'
	> OAuth Client ID
		> Choose 'Web application'

Add `http://localhost:8080` to Authorized JavaScript origins

Add `http://localhost:8080/api/auth/google/callback` to Authorized redirect URIs

Click 'Create'

You should get a Client ID and Secret.

Back in your project locally, create an `secret.js` file in the `/server` directory:

(Use the client ID and secret we just got from Google)

```js
module.exports = {
  CLIENT_ID: 'yourId123.apps.googleusercontent.com',
  CLIENT_SECRET: 'yoursecret'
}
```

This file is in ignored by git because it is in your `.gitignore`. Never commit or push this file.

## Deployment to Heroku

```sh
$ heroku create
```

```sh
$ heroku config:set CLIENT_ID=yourId123.apps.googleusercontent.com CLIENT_SECRET=yoursecret
```
(You can also do this on dashboard.heroku.com under your app's settings.)

### To deploy:

```sh
$ git push heroku master
```

Your app should be live on heroku now, but if you try to `Log in with Google`, you will get a 400 error. Take note of your new app's URL.


### Updating Google API authorized origins


To fix this, go back to the Google API Dashboard and:

- Add `your-app-name-123.herokuapp.com` to Authorized JavaScript origins
- Add `your-app-name-123.herokuapp.com/api/auth/google/callback` to Authorized redirect URIs

Try to log in  `Log in with Google` again, and you're golden!
