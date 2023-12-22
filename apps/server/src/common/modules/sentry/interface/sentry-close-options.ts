export interface SentryCloseOptions {
	enabled: boolean;
	// timeout – Maximum time in ms the client should wait until closing forcefully
	timeout?: number;
}