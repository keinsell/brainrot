export interface InstrumentationAgent {
	start(): void
	stop(): void
	isRunning(): boolean
}