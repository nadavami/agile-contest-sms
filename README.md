# agile-contest-sms
[![Build Status](https://travis-ci.org/nadavami/agile-contest-sms.svg?branch=master)](https://travis-ci.org/nadavami/agile-contest-sms)
[![Coverage Status](https://coveralls.io/repos/github/nadavami/agile-contest-sms/badge.svg?branch=master)](https://coveralls.io/github/nadavami/agile-contest-sms?branch=master)


While watching a conference talk, you can enter the contest by sending an SMS (a text) to `(450) 600-3601`. You will receive a response that you've been entered. By the end of the talk a winner will be selected and notified both by SMS. 

## Presentation
The presentation can be [found here](presentation.pdf) 


## Requirements

* Node.js (^6.2.2 or ^8.0.0)
* Yarn `npm install -g yarn`


## Usage

* `yarn` - to install dependencies
* `yarn start` - will start the server and assign a random port
* or
* `PORT=55555 yarn start` - to set a port


## Run Tests

* `yarn test`


## Routes

* `/` - The App
* `/api/incoming` - Twilio Incoming Webhook
* `/api/participants` - List All Participants
* `/api/winner` - Randomly Select and Show a Winner
* `/api/flushall` - Delete all participants 

