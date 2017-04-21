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
Then open [`localhost:8080`](http://localhost:8080) in a browser.

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
* React-Router

## Future Features
* Add additional spellings for certain elements (e.g. Aluminum vs Aluminium, Sulfur vs Sulphur, etc.)
* Allow users to work on a specific subset of the periodic table during a session (e.g. Noble Gases, Alkali metals, etc).
* Add colors to element card text to indicate whether the element's natural state is a gas, liquid, solid, or unknown.
* Add info on elements' natural occurance: primordial, from decay, or synthetic.
* Long-term storage of data on how many times a user's correctly/incorrectly answered each element.
  * Add component to display user's full long-term scoreboard
