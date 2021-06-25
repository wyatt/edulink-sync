# edulink-sync
A NodeJS based syncing tool for EduLink One and Google Calendar.

### Inspiration
I decided to make this program as I wanted to view all of my classes in a more cohesive way by using Google Calendar to sync accross many devices, operating systems and apps. This project will likely expand in the future with support for homework syncing once summer break is over.

### Usage
1. Install and run `redis` in a docker container. Explaining how to do that is outside the scope of this project but the general command is `docker run -p 56379:6379 -d redis`
1. Configure your env variables - See below
1. Run `yarn` to install dependencies
1. [Obtain OAuth credentials](https://developers.google.com/identity/protocols/oauth2) from Google, download the JSON file and copy it to `src/util/google/credentials.json`
   > Note: Ensure the credentials are for the application type: "Desktop"
1. Run `yarn build && yarn start` to build and run the program
1. Authenticate the app following the terminal prompts (You will only have to do this once)
1. Sit back, relax and watch the progress bar

### Env variables
```dotenv
SCHOOL_SUBDOMAIN
```
 The string that precedes `.edulinkone.com` in the domain
```dotenv
CALENDAR_ID
```
ID of the calendar to sync. Obtained [here](https://developers.google.com/calendar/api/v3/reference/calendarList/list). I recommend using an empty, new calendar to avoid event conflicts
```dotenv
EDULINK_USERNAME
```
Your EduLink username
```dotenv
EDULINK_PASSWORD
```
Your EduLink password
```dotenv
REDIS_URL (optional)
```
The url of your redis container. Usually something like this `redis://127.0.0.1:56379`

### Contributing & Issues
I've only tested this on my schools implementation of EduLink, so it may not work correctly on yours. If it doesn't open an issue, or if you have found a solution, open a pull request. I hope that this small program will help you in you organisational and productivity needs and I hope we can build a fully fledged suite of tools for syncing to and from EduLink

### Disclaimer
Obligatory "I am not responsible for any damage caused by using this program. I am not responsible if you miss your classes, mess up your calendar or cause thermonuclear war by using this software."