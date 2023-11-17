export class Message {
	id: string
	/** `causationId` is an identifier used in event-driven architectures to track
	 * the causal relationship between events. It represents the ID of the event that
	 * caused the current event to occur. This can be useful for tracing and debugging
	 * issues in distributed systems, as it allows developers to see the sequence of
	 * events that led to a particular state or behavior.
	 *
	 * @see [RailsEventStore](https://railseventstore.org/docs/v2/correlation_causation/)
	 * @see [thenativeweb/commands-events/#1](https://github.com/thenativeweb/commands-events/issues/1#issuecomment-385862281)
	 */
	causationId?: string | undefined

	/** A correlation ID is a unique identifier used to correlate and track a
	 * specific transaction or event as it moves through a distributed system or
	 * across different components. It helps to trace the flow of a request and
	 * its associated responses across different services and systems. Correlation IDs
	 * can be generated and propagated automatically by software components or added
	 * manually by developers for debugging and troubleshooting purposes.
	 *
	 * @see [RailsEventStore](https://railseventstore.org/docs/v2/correlation_causation/)
	 * @see [thenativeweb/commands-events/#1](https://github.com/thenativeweb/commands-events/issues/1#issuecomment-385862281)
	 */
	readonly correlationId?: string | undefined

	readonly headers?: Record<string, unknown> | undefined
	readonly metadata?: Record<string, unknown> | undefined

	constructor(id: string) {
		this.id = id
	}
}