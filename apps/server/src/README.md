# The Source

- `kernel`, directory containing somehow a foundation of software such as permission models, process management, and
  memory management, all of these are essential for software to function.
  All files from `kernel` directory can be used in every other layer of application,
  where `kernel` should not depend on any other layers (it can be considered application layer in some cases).