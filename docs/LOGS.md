# Logging Guideline

Logging is an essential part of software development that helps us understand the behavior and performance of our
applications. In this project, we use logging to diagnose issues, monitor system health, and track application events.
In this document, we'll cover best practices for writing effective logs that help us make informed decisions about our
codebase.

## Logging Best Practices

### Use Appropriate Log Levels

Our logging system uses the following log levels:

- **Trace**: For extremely detailed debugging information that's only relevant during development and performance
  profiling.
- **Debug**: For detailed debugging information that's only relevant during development.
- **Info**: For informational messages that describe the normal flow of application logic and user interactions.
- **Warning**: For non-critical issues that require attention but don't cause the application to fail, such as
  deprecated functionality or configuration warnings.
- **Error**: For critical errors that prevent the application from functioning correctly and must be addressed
  immediately.
- **Fatal**: For severe errors that cause the application to crash or become unresponsive and require urgent attention.

Use these log levels consistently and only log messages at the appropriate level. This will help keep our logs clear,
concise, and easy to read.

### Log Level Guidance

#### Word-choice association

- **Trace**: Use words like "sent request", "received response", "parsed", "called function", "exited function", "
  processing", "monitoring". Trace logs are for extremely detailed debugging information that's only relevant during
  development and performance profiling.
- **Debug**: Use words like "initialized module", "loaded configuration", "parsed input", "validated input", "
  transformed data", "generated output", "executed query", "retrieved data", "computed result", "generated report", "
  created resource", "updated resource", "deleted resource". Debug logs are for detailed debugging information that's
  only relevant during development.
- **Info**: Use words like "started application", "initialized server", "listening for connections", "received
  request", "processed request", "sent response", "shutting down server", "exiting application", "user logged in", "user
  logged out", "user registered", "user updated profile", "user deleted account". Info logs are for informational
  messages that describe the normal flow of application logic and user interactions.
- **Warning**: Use words like "deprecated functionality", "configuration warning", "resource limit reached", "rate limit
  exceeded", "invalid input", "missing input", "unexpected input", "unauthorized access", "access denied", "resource not
  found", "resource conflict", "resource unavailable", "resource exhausted (e.g. disk space, memory, network
  bandwidth)", "system health degraded", "performance degraded". Warning logs are for non-critical issues that require
  attention but don't cause the application to fail.
- **Error**: Use words like "failed to initialize module", "failed to load configuration", "failed to parse input", "
  failed to validate input", "failed to transform data", "failed to generate output", "failed to execute query", "failed
  to retrieve data", "failed to compute result", "failed to generate report", "failed to create resource", "failed to
  update resource", "failed to delete resource", "failed to start application", "failed to initialize server", "failed
  to listen for connections", "failed to receive request", "failed to process request", "failed to send response", "
  failed to shut down server", "failed to exit application", "user login failed", "user registration failed", "user
  profile update failed", "user account deletion failed". Error logs are for critical errors that prevent the
  application from functioning correctly and must be addressed immediately.
- **Fatal**: Use words like "application crashed", "application unresponsive", "system crash", "system unresponsive", "
  database corruption", "data loss", "data corruption", "security breach", "security vulnerability", "security
  incident", "security threat". Fatal logs are for severe errors that cause the application to crash or become
  unresponsive and require urgent attention.