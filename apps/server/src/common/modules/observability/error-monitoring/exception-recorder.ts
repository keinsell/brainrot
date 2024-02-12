export interface ExceptionRecorder {
	record(exception: unknown): void
}