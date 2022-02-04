
import {edulinkFetch} from './util/fetch';
import {Timetable} from './types/edulink/timetable';
import {GoogleOauth} from './util/google/google';
import {env} from './util/env';
import dayjs from 'dayjs';
import {timetableParams} from './util/params';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import cliProgress from 'cli-progress';
import {sleep} from './util/helper';

dayjs.extend(customParseFormat);

const timetableBar = new cliProgress.SingleBar(
	{format: 'Timetable Sync: {bar} | {percentage}% || {value}/{total} events'},
	cliProgress.Presets.shades_classic
);

const timetableSync = async () => {
	return GoogleOauth(async calendar => {
		const existingEvents = await calendar.events.list({
			calendarId: env.calendarId,
			timeMin: dayjs().toISOString(),
			timeMax: dayjs().add(1, 'month').toISOString(),
			orderBy: 'startTime',
			singleEvents: true,
		});
		let edulinkArray = (await edulinkFetch<Timetable>('Timetable', timetableParams)).data.weeks
			.map(week => week.days)
			.flat(1)
			.map(day => {
				return day.lessons.map(lesson => ({
					...lesson,
					...day.periods.find(period => period.id === lesson.period_id),
					date: day.date,
				}));
			})
			.flat(1)
			.map(period => ({
				start: dayjs(`${period.date}@${period.start_time}`, 'YYYY-MM-DD@HH:mm'),
				end: dayjs(`${period.date}@${period.end_time}`, 'YYYY-MM-DD@HH:mm'),
				title: period.teaching_group.subject,
				location: period.room.name,
				teacher: `${period.teacher.title} ${period.teacher.forename} ${period.teacher.surname}`,
				class_id: period.teaching_group.name,
			}));
		if (existingEvents.data.items && existingEvents.data.items.length > 0) {
			const googleArray = existingEvents.data.items
				.filter(item => item.start?.dateTime && item.end?.dateTime)
				.map(item => ({
					title: item.summary,
					start: dayjs(item.start?.dateTime as string),
					end: dayjs(item.end?.dateTime as string),
				}));
			edulinkArray = edulinkArray.filter(edulinkLesson => {
				return googleArray.every(googleEvent => {
					return !googleEvent.start.isSame(edulinkLesson.start) && !googleEvent.end.isSame(edulinkLesson.end);
				});
			});
		}

		timetableBar.start(edulinkArray.length, 0);

		for (const event of edulinkArray) {
			await calendar.events.insert(
				{
					calendarId: env.calendarId,
					requestBody: {
						summary: event.title,
						start: {dateTime: event.start.toISOString()},
						end: {dateTime: event.end.toISOString()},
						location: event.location,
						description: `${event.class_id} - ${event.teacher}`,
					},
				},
				async (err, event) => {
					if (err || !event) throw new Error(`❌ Google calendar: ${err?.message ?? 'Unknown error'}`);
					timetableBar.increment();
				}
			);
			await sleep(500);
		}
	});
};

(async () => {
	await timetableSync();
})();
