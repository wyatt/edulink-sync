import fs from 'fs';
import readline from 'readline';
import {calendar_v3, google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import path from 'path';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Load client secrets from a local file.
export const GoogleOauth = (callback: (calendar: calendar_v3.Calendar) => void) =>
	fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
		if (err) return console.log('Error loading client secret file:', err);
		// Authorize a client with credentials, then call the Google Calendar API.
		authorize(JSON.parse(content.toString()), (auth: OAuth2Client) => {
			const calendar = google.calendar({version: 'v3', auth});
			callback(calendar);
		});
	});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(
	credentials: {installed: {client_secret: any; client_id: any; redirect_uris: any}},
	callback: {(auth: any): void; (arg0: OAuth2Client): void}
) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getAccessToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token.toString()));
		callback(oAuth2Client);
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {function} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client: OAuth2Client, callback: {(auth: any): void; (arg0: OAuth2Client): void; (arg0: any): void}) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', code => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err || !token) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			callback(oAuth2Client);
		});
	});
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth: OAuth2Client) {
	const calendar = google.calendar({version: 'v3', auth});
	calendar.events.list(
		{
			calendarId: 'primary',
			timeMin: new Date().toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: 'startTime',
		},
		(err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			const events = res?.data.items;
			if (events?.length) {
				console.log('Upcoming 10 events:');
				events.map(event => {
					const start = event.start?.dateTime || event.start?.date;
					console.log(`${start} - ${event.summary}`);
				});
			} else {
				console.log('No upcoming events found.');
			}
		}
	);
}
