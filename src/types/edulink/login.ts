import {Metrics} from './global';

export interface Login {
	api_version: number;
	establishment: Establishment;
	authtoken: string;
	user: User;
	analytics_enabled: any[];
	personal_menu: IdName[];
	learner_menu: any[];
	sub_menu: {label: string};
	can_create_messages: boolean;
	can_create_message_types: any[];
	login_method: string;
	login_method_change_password: boolean;
	capabilities: Capabilities;
	session: {expires: number};
	miscellaneous: Miscellaneous;
	method: string;
	success: true;
	metrics: Metrics;
}

export interface Establishment {
	logo: string;
	name: string;
	rooms: Room[];
	year_groups: IdName[];
	community_groups: IdName[];
	discover_groups: IdName[];
	applicant_admission_groups: IdName[];
	applicant_intake_groups: IdName[];
	form_groups: FormGroup[];
	teaching_groups: TeachingGroup[];
	subjects: Subject[];
	report_card_target_types: ReportCardTargetType[];
}

export interface Room {
	id: string;
	code: string;
	name: string;
}

export interface IdName {
	id: string;
	name: string;
}

export interface FormGroup {
	id: string;
	name: string;
	year_group_ids: string[];
	employee_id?: string;
	room_id?: string;
}

export interface TeachingGroup {
	id: string;
	name: string;
	employee_id?: string;
	year_group_ids: string[];
}

export type Subject = IdName & {active: boolean};

export interface ReportCardTargetType {
	id: number;
	code: string;
	description: string;
}

export interface User {
	establishment_id: number;
	id: string;
	gender: string;
	title: any;
	forename: string;
	surname: string;
	types: string[];
	username: string;
	community_group_id: string;
	form_group_id: string;
	year_group_id: string;
	avatar: Avatar;
	remember_password_permitted: boolean;
}

export interface Avatar {
	width: number;
	height: number;
	photo: string;
	cache: string;
}

export interface Capabilities {
	'fcm': {remove_old_token: boolean};
	'data_collection': {move_cohabitees: boolean};
	'icalendar.group_import': boolean;
	'communicator.enabled': boolean;
	'communicator': Communicator;
	'communicator.reply_to': boolean;
	'communicator.switchuser': boolean;
	'communicator.select_all': boolean;
	'forms': {};
	'communicator.create_message_types': any[];
	'communicator.new_message_recipients': any[];
	'parentevent.administrator': boolean;
	'parentevent.switchteacher': boolean;
	'parentevent.blockslot': boolean;
	'parentevent.video': boolean;
	'marksheets.change_teacher': boolean;
	'resourcebooking.manager': boolean;
	'achievement': {create: boolean};
	'behaviour': Behaviour;
	'club': Club;
	'attendance': {today: boolean};
	'homework.create': boolean;
	'homework.teaching_group_required': boolean;
	'homework.learnercreate': boolean;
	'homework.homework_issues': boolean;
	'behaviour_detentionmanagement.session_create': boolean;
	'behaviour_detentionmanagement.hide_learner_add': boolean;
	'calendar.event_create': boolean;
	'calendar.hide_sourcecog': boolean;
	'attendance.absence_management': boolean;
	'noticeboard': Noticeboard;
}

export interface Communicator {
	message_reply: boolean;
	email: Email;
	parent_identification: ParentIdentification;
}

export interface Email {
	html: boolean;
	attachments: boolean;
}

export interface ParentIdentification {
	max_priority: string;
	parental_responsibility: string;
	options: {max_priority: MaxPriority};
}

export interface MaxPriority {
	'highest': string;
	'1': string;
	'2': string;
	'3': string;
	'4': string;
	'5': string;
	'6': string;
	'7': string;
	'8': string;
	'9': string;
	'10': string;
	'ignore': string;
}

export interface Behaviour {
	create: boolean;
	report_card: {detail: boolean};
}

export interface Club {
	create: boolean;
	export: boolean;
}

export interface Noticeboard {
	manager: boolean;
	folders: boolean;
}

export interface Miscellaneous {
	upload: Upload;
	max_status_last_visible: number;
	status_interval_background: number;
	session_expiry_modal: number;
	status_interval: number;
	student_count_warning: number;
	app: {logout_on_pause: boolean};
	editor: {defaultfont: string};
}

export interface Upload {
	chunksize: number;
	max_attachment_size: number;
	max_attachment_size_communicator: number;
	max_body_size_communicator: number;
}
