export interface EdulinkResponse<T> {
	jsonrpc: string;
	result: Failure | T;
	id: number;
}

export interface Failure {
	success: false;
	error: string;
	metrics: Metrics;
}

export interface Metrics {
	st: string;
	sspt: number;
	sspt_us: number;
	uniqid: string;
}

export interface PositiveResponseDefaults {
	success: true;
	method: string;
}
