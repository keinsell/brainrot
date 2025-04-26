# Logger Reference Architecture

The logger component is responsible for logging events and errors that occur within the system. It is a crucial component in any software system, as it allows developers and operators to understand the behavior of the system, identify issues, and troubleshoot errors. This document provides a reference architecture for a logger component that can be used in a variety of software systems.

- `LogRecord`
- `LogAppender` (also known as: Transporter)
- `LogLevel`
- `LogFilter`
- `LogLayout` (also known as: Formatter)
- `LoggerContext`
- `LogSerializer`

## LogRecord

```typescript
export interface LogRecord {
    timestamp: Date
}
```

## Log Appender

A log appender is a component that is responsible for writing log messages to a specific destination, such as a file, a database, or a streaming service. The log appender receives log messages from the logger and writes them to the designated destination.

## Log Level

- `INFO`, generic information about what happen.
- `DEBUG`
- `WARN`
- `TRACE`
- `ERROR`

Additional log levels can be considered custom or maybe off-standard but I find it useful to introduce `FATAL` level for non-recoverable error that are actually taking whole software down.

## Log Layout

- `ndjson`
- `syslog`
- `plain`
- `pretty`


## Recommendations

- Non-blocking flow
- Rotational file logging
- Log censoring and redacting
- Log/Activity tracing
- Transporting to multiple sources (Syslog, journald, file, console)

## Read More:

- https://logging.apache.org/log4j/2.x/manual/architecture.html