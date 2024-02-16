For every error that have happened in software,
hardware or external provider software should never expose the error to the user
(the original error message) as they are untrackable and may contain sensitive information.
Instead we should use `Exception` class
along with `HttpException` to inform user about known or unknown errors that happened during processing a operation.
There should be also asynchronous notification channel for the user in case of critial actions that could not be done.