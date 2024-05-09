const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

// const express = require('express');
const app = express();

app.use(cors({ origin: true }));

app.get('/overall', async (req, res) => {
    // const response = await overall(req.query.input);
    // response = "I have a client meeting on May 12th from 1pm to 2pm";
    response = await overall(req.query.input);
    overall(response);
    res.json(response);
});
 
async function overall(theText) {

    // const resp = await fetch(
    //     'https://noggin.rea.gent/peaceful-lungfish-5524',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
    //       },
    //       body: JSON.stringify({
    //         // fill variables here.
    //         "prompt": theText,
    //       }),
    //     }
    //   ).then(response => response.text());


    //   app.get("/", async (req, res) => {
           

          // Fetch the data from the API
    const response = await fetch('https://noggin.rea.gent/peaceful-lungfish-5524', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
        },
        body: JSON.stringify({ "prompt": theText })
    });

    const data = await response.json(); // Assuming the response is JSON formatted

        // Extract details from the parsed response
    const [eventName, date, startTime, endTime] = data;
    const combinedStart = date + " " + startTime;
    const combinedEnd = date + " " + endTime;

        // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
        keyFile: 'newcreds.json', // Ensure this file path is correct and accessible
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1hCDoXMnFafAUUEXexC_Kd_57fW7NTF0bavHCbGNjwj0';

        // Append data to Google Sheets
    try {
        await googleSheets.spreadsheets.values.batchUpdate({
            spreadsheetId,
            resource: {
                valueInputOption: 'RAW',
                data: [
                    { range: 'mysheet!A1', values: [[eventName]] },
                    { range: 'mysheet!B1', values: [[combinedStart]] },
                    { range: 'mysheet!C1', values: [[combinedEnd]] },
                    { range: 'mysheet!D1', values: [[date]] },
                    { range: 'mysheet!E1', values: [[startTime]] },
                    { range: 'mysheet!F1', values: [[endTime]] },
                ],
            },
        });
        // res.send('Data added to Google Sheets successfully!');
    } catch (error) {
        console.error('Failed to update Google Sheets:', error);
        res.status(500).send('Failed to update Google Sheets');
    }

    return "Completed";

}


    // const resp = await fetch(
    //             'https://noggin.rea.gent/peaceful-lungfish-5524',
    //             {
    //               method: 'POST',
    //               headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
    //               },
    //               body: JSON.stringify({
    //                 // fill variables here.
    //                 "prompt": theText,
    //               }),
    //             }
    //           ).then(response => response.text());
  
    //           // let response;
  
    //           //     fetch('https://noggin.rea.gent/peaceful-lungfish-5524', {
    //           //     method: 'POST',
    //           //     headers: {
    //           //         'Content-Type': 'application/json',
    //           //         Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
    //           //     },
    //           //     body: JSON.stringify({
    //           //         "prompt": transcript,  // assuming 'transcript' is defined elsewhere
    //           //     }),
    //           //     }).then(res => res.text()).then(data => {
    //           //     setTimeout(() => {
    //           //         response = data;
    //           //         console.log("Response assigned after 3 seconds:", response);
    //           //     }, 3000);
    //           //     });
  
  
    //           //START HERE
  
              
  
    //         //   const app = express();
  
    //           app.get("/", async (req, res) => {
                   
  
    //               // Fetch the data from the API
    //               const response = await fetch('https://noggin.rea.gent/peaceful-lungfish-5524', {
    //                   method: 'POST',
    //                   headers: {
    //                       'Content-Type': 'application/json',
    //                       Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
    //                   },
    //                   body: JSON.stringify({ "prompt": theText })
    //               });
  
    //               const data = await response.json(); // Assuming the response is JSON formatted
  
    //               // Extract details from the parsed response
    //               const [eventName, date, startTime, endTime] = data;
    //               const combinedStart = date + " " + startTime;
    //               const combinedEnd = date + " " + endTime;
  
    //               // Set up Google Sheets API
    //               const auth = new google.auth.GoogleAuth({
    //                   keyFile: 'newcreds.json', // Ensure this file path is correct and accessible
    //                   scopes: 'https://www.googleapis.com/auth/spreadsheets',
    //               });
  
    //               const client = await auth.getClient();
    //               const googleSheets = google.sheets({ version: 'v4', auth: client });
    //               const spreadsheetId = '1hCDoXMnFafAUUEXexC_Kd_57fW7NTF0bavHCbGNjwj0';
  
    //               // Append data to Google Sheets
    //               try {
    //                   await googleSheets.spreadsheets.values.batchUpdate({
    //                       spreadsheetId,
    //                       resource: {
    //                           valueInputOption: 'RAW',
    //                           data: [
    //                               { range: 'mysheet!A1', values: [[eventName]] },
    //                               { range: 'mysheet!B1', values: [[combinedStart]] },
    //                               { range: 'mysheet!C1', values: [[combinedEnd]] },
    //                               { range: 'mysheet!D1', values: [[date]] },
    //                               { range: 'mysheet!E1', values: [[startTime]] },
    //                               { range: 'mysheet!F1', values: [[endTime]] },
    //                           ],
    //                       },
    //                   });
    //                   res.send('Data added to Google Sheets successfully!');
    //               } catch (error) {
    //                   console.error('Failed to update Google Sheets:', error);
    //                   res.status(500).send('Failed to update Google Sheets');
    //               }
    //           });
  
    //         //   app.listen(1234, () => {
    //         //       console.log('Server running on port 1234');
    //         //   });
  
  
  
    //           //END HERE
    //         }


//   module.exports = overall;


app.listen(8000, () => console.log('Server running on port 8000'))




/*
const fetch = require('node-fetch');
const express = require('express');
const { google } = require('googleapis');

const app = express();

app.get("/", async (req, res) => {
    const input = "I have a meeting on May 12th from 1pm to 3pm";

    // Fetch the data from the API
    const response = await fetch('https://noggin.rea.gent/peaceful-lungfish-5524', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
        },
        body: JSON.stringify({ "prompt": input })
    });

    const data = await response.json(); // Assuming the response is JSON formatted

    // Extract details from the parsed response
    const [eventName, date, startTime, endTime] = data;
    const combinedStart = date + " " + startTime;
    const combinedEnd = date + " " + endTime;

    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
        keyFile: 'newcreds.json', // Ensure this file path is correct and accessible
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1hCDoXMnFafAUUEXexC_Kd_57fW7NTF0bavHCbGNjwj0';

    // Append data to Google Sheets
    try {
        await googleSheets.spreadsheets.values.batchUpdate({
            spreadsheetId,
            resource: {
                valueInputOption: 'RAW',
                data: [
                    { range: 'mysheet!A1', values: [[eventName]] },
                    { range: 'mysheet!B1', values: [[combinedStart]] },
                    { range: 'mysheet!C1', values: [[combinedEnd]] },
                    { range: 'mysheet!D1', values: [[date]] },
                    { range: 'mysheet!E1', values: [[startTime]] },
                    { range: 'mysheet!F1', values: [[endTime]] },
                ],
            },
        });
        res.send('Data added to Google Sheets successfully!');
    } catch (error) {
        console.error('Failed to update Google Sheets:', error);
        res.status(500).send('Failed to update Google Sheets');
    }
});

app.listen(1234, () => {
    console.log('Server running on port 1234');
});

*/