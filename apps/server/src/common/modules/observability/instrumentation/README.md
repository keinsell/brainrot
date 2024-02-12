# Instrumentation

- Instrumentation is a module that will setup a instrumentation services for the application (Sentry, OpenTelemetry,
  etc.).

## Usage

    ```typescript
    import { InstrumentationModule } from '@common/modules/observability/instrumentation';

    const app = await NestFactory.create(AppModule);

    await InstrumentationModule.setup(app);
    ```

```typescript
import {Module, DynamicModule} from '@nestjs/common';

import {InstrumentationService} from './instrumentation.service';
import {InstrumentationConfig} from './instrumentation.config';

@Module({})
export class InstrumentationModule {
    static setup(config: InstrumentationConfig): DynamicModule {
        return {
            module: InstrumentationModule,
            providers: [
                {
                    provide: InstrumentationConfig,
                    useValue: config,
                },
                InstrumentationService,
            ],
            exports: [InstrumentationService],
        };
    }
}
```