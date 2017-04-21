# Periodic Repetition
## A simple way to learn the periodic table of elements using a spaced repetition algorithm

### Overview

The <a href ='http://cryptic-shore-50871.herokuapp.com/'>Periodic Repetition</a> app provides easy learning of the periodic table of elements
by implementing spaced repetition. Spaced repetition is a learning technique
that incorporates increasing intervals of time between subsequent review of
previously learned material in order to exploit the psychological "spacing effect".
Essentially learning happens in spaced repetition much like flash cards. The information
that you are more familiar with is pushed to the back of the flash card stack, while
the information you are unfamiliar stays at the front so you repeatedly see it more times,
therefore increasing learning.

In this application we decided to apply these same principles of spaced repetition
to help students learn the periodic table of elements.

##Screenshots
<img src='./client/main-page.png'><img src='./client/login-page.png'>


## Installation
```
>   git clone https://github.com/TCHayes/spaced-repetition.git
>   cd spaced-repetition
>   npm install
```

### Launching
```
>   npm run dev
```
Then open [`localhost:8000`](http://localhost:8000) in a browser.
### Testing
```
>   npm run test
```
Note on compatibility: The API relies on NodeJS v6.3.1.  All other dependencies are listed in the _package.json_ file. Although the API might run on alternative versions, it has not been tested.

## Design & Functionality

### Frontend

The front-end of Periodic Repetition employs the ReactJS framework and Redux store.
The user is first directed to a login page and asked to register using a Google
OAuth 2.0 authentication strategy. This allows any google account holder to easily
register this app and track their own individual progress in learning the elements.

Once authenticated, the user is directed to the main page which displays a box
with the element letters and atomic numbers. The user is then instructed to guess
the corresponding element to the letter and atomic number. If the user is correct,
their score will increase. If incorrect, their incorrect score will increase.
Based upon if the answer is correct or incorrect the algorithm will shuffle the
questions in appropriate order to provide the spaced repetition learning technique.

### Backend

The backend of this app is built on NodeJS using ExpressJS middleware, MongoDB
and Mongoose ORM. The backend is the engine for this application. It provides
the Google OAuth 2.0 authentication, the spaced repetition algorithm and also
stores user progress in MongoDB.

## Technology
* HTML5
* CSS3
* JavaScript
* React
* Redux
* jQuery
* React-Router
