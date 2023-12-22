export interface SentryFilterFunction {
	(exception: unknown): boolean;
}