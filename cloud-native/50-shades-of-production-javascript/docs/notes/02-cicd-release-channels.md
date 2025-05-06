### Release Channels

- `stable` (`stable` branch)
- `canary` (`next` branch)
- `dev` (`main` branch)

### Release Tags

- Semver-based (`vX.X.X-tag.ITERATION`)

### Flow

- PR Opened
    - dev-PR_ID release started
    - PR mofified source
        - Created a preview release
    - PR Closed
        - Preview release deleted
- Deployed to dev