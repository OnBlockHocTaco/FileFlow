# FileFlow
A Project for CS160 - Developing a better ToDo app that effortlessly uses LLMs to easily create, categorize, and navigate across ToDo's




Calendar:
Step 1 — Say something into fileflow. If identified as a calendar event....
Prompt should be like so: 
- Schedule my Business Meeting for May 9th from 1pm to 3pm. OR
- I have a client call on June 11 from 3pm to 4pm.

Step 2:
- It feeds it through noggin to get an array like so
- ["Client Call", "6/11/2024", "3:00:00 PM", "4:00:00 PM"]

Step 3:
This array runs thru index.js in fileflow folder. The elements are parsed and ...
- MAKE SURE TO RUN nodemon index.js
- visit ... http://localhost:1234/  and refresh
- visit and RUN ... https://script.google.com/u/0/home/projects/1Pf4sDD5Et7sIjvGWGp6v83Yxa_SUH75eaoeQyeSk6yvfmQeOugkY6SAg/edit

Step 4:
- https://calendar.google.com/calendar/u/0/r/month (ishangoyal100 gmail) ... PRESENTATION CALENDAR
- igoyal@berkeley.edu email


https://www.youtube.com/watch?v=FxxPq2wXcK4&list=LL&index=2&t=312s
https://www.youtube.com/watch?v=PFJNJQCU_lo&list=LL&index=1&t=795s

npm init
npm install express ejs googleapis
npm install -D nodemon
nodemon index.js

If needed: sudo npm install -g --force nodemon
