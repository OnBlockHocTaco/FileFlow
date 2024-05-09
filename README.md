# FileFlow
A Project for CS160 - Developing a better ToDo app that effortlessly uses LLMs to easily create, categorize, and navigate across ToDo's


Notes:

Manual Usage - One can create new folder categories by going to the home screen of the application, and at the very top, clicking on New Folder to create a new category. They can then add new notes by clicking New Note and writing in a note title, the folder will be assigned to the current folder but can be changed in the drop down menu, and you can finally, write in a description.

Voice Usage - Go to the lockscreen and click on the voice widget. The widget has been modified where you click on it once in order to turn on voice recognition and click it again to end voice recognition. 

Make a request, something like I have an idea about meditation, jot down a note to finish my CS160 work, or whatever you would like, and it should take you to the note creation screen. A title will be autocreated, a folder will be auto-assigned based on the folders created, and the description will use what you said.

Calendar:

Step 1 - Make sure row1 (Elements A1 to F1 are empty) is clear except email: https://docs.google.com/spreadsheets/d/1hCDoXMnFafAUUEXexC_Kd_57fW7NTF0bavHCbGNjwj0/edit#gid=0

Step 2 — Say something into fileflow. If identified as a calendar event....
Prompt should be like so: 
- Schedule my Business Meeting for May 9th from 1pm to 3pm. OR
- I have a client call on June 11 from 3pm to 4pm.

Step 3:
- It feeds it through noggin to get an array like so
- ["Client Call", "6/11/2024", "3:00:00 PM", "4:00:00 PM"]

Step 4: Actual Calendar Creation
- This array runs thru index.js 
- MAKE SURE TO RUN nodemon index.js
- visit http://localhost:1234/ and refresh
- You will likely need to modify the newcreds.json to your credentials to create notes
- If you want to use your own calendar, you will need to grab the calendar ID of whatever calendar you are using, this can be grabbed from the google calendar website by looking at the calendar settings.

Step 5:
- https://tinyurl.com/fileflowcal ... PRESENTATION CALENDAR
- igoyal@berkeley.edu gets an email (you can change the email to your own email as well)


Possible necessary dependencies:
* when it starts asking for package names and stuff, hit enter a bunch of times until it stops asking questions. 
- npm init   
- npm install express ejs googleapis    
- npm install -D nodemon
- nodemon index.js     

If needed: 
- If you get this error: nodemon-not-working-bash-nodemon-command-not-found, then install this:
- sudo npm install -g --force nodemon
