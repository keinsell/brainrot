# Configuration

`Configurator` will look for application configuration files, then will
  search environment variables and at the end if environment variables
  provided external secret providers will hit them up for secrets.
  If the configuration wasn't satisfied, error will be thrown.

- Environment Variables
- Configuration Files
- Command Line Arguments
- Externalized configuration providers

## RC-like Configuration

Application always will take command-line parameters as the highest priority,
then environment variables, then configuration files.
However, if the external configuration provider is available by configuration
software such as Consul, Vault, or any other, it'll be used as the highest
priority once the application will connect to it.

## Configuration File Resolution

// TODO: ...

## Configuration File Format

- json
- yaml
- toml
- xml
- ini
- hcl
- properties
- dotenv
- env