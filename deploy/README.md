```bash
ln -s .env ./deployment/.env
ln --relative .env ./src/infrastructure/database/prisma/.env
```

### Development

#### `/etc/hosts`

```
code /etc/hosts
```

```
# Development Services
127.0.0.1 jaeger.local
# End of Development Services
```

- [ ] Docker Compose Deployment
- [ ] Docker Swarm Deployment
- [ ] Kubernetes Deployment
- [ ] Localhost Deployment