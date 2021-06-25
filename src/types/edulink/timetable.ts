import {Metrics} from './global';

export interface Timetable {
	method: string;
	success: true;
	requested_date: string;
	showing_from: string;
	showing_to: string;
	weeks: Week[];
	metrics: Metrics;
}

export interface Week {
	name: string;
	is_current: boolean;
	days: Day[];
}

export interface Day {
	cycle_day_id: number;
	name: string;
	original_name: string;
	date: string;
	is_current: boolean;
	periods: Period[];
	lessons: Lesson[];
}

export interface Period {
	id: number;
	sims_id: number;
	name: string;
	start_time: string;
	end_time: string;
	empty: boolean;
}

export interface Lesson {
	period_id: number;
	room: Room;
	teaching_group: TeachingGroup;
	teacher: Teacher;
	teachers: string;
	alternatives?: Alternatives[];
}

export interface Room {
	name: string | null;
	id: any | null;
	moved: boolean;
}

export interface TeachingGroup {
	id: number;
	name: string;
	subject: string;
}

export interface Teacher {
	id: number;
	title: string;
	forename: string;
	surname: string;
}

export interface Alternatives {
	period_id: number;
	room: Room;
	teaching_group: TeachingGroup;
	teacher: Teacher;
	teachers: string;
}
