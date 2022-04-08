# Profile Service POC

This folder contains all the UI you will need to create your profile service, excluding the API integration.
You will need to create the [axios](https://axios-http.com/docs/api_intro) methods to complete the integration in [./api/users.js](./api/users.js)

## Build Setup

```bash
# clone the repo
$ git clone git@github.com:RyanMulready/nuxt-boilerplate.git

# checkout this branch
$ git checkout profile-service-poc

# create your own branch
git checkout -b my-profile-service

# create your .env file
# by default the app will look for `AWS_USER_PROFILE_API` variable which is your base API url
echo "AWS_USER_PROFILE_API=https://YOUR_CUSTOM_URL.amazonaws.com/api/" >> .env


# install dependencies
$ npm install

# the app will be available at http://localhost:3000/users
$ npm run dev

```
