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
- Make sure row1 is clear except email: https://docs.google.com/spreadsheets/d/1hCDoXMnFafAUUEXexC_Kd_57fW7NTF0bavHCbGNjwj0/edit#gid=0
- MAKE SURE TO RUN nodemon index.js
- visit ... http://localhost:1234/  and refresh
- visit and RUN ... click start button

Step 4:
- https://calendar.google.com/calendar/u/0/r/month (ishangoyal100 gmail) ... PRESENTATION CALENDAR
- igoyal@berkeley.edu email


https://www.youtube.com/watch?v=FxxPq2wXcK4&list=LL&index=2&t=312s
https://www.youtube.com/watch?v=PFJNJQCU_lo&list=LL&index=1&t=795s

Possible necessary dependencies:
- npm init   
- npm install express ejs googleapis    
- npm install -D nodemon
- nodemon index.js     

If needed: 
- If you get this error: nodemon-not-working-bash-nodemon-command-not-found, then install this:
- sudo npm install -g --force nodemon
