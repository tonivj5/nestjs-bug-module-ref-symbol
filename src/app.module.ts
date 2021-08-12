import {
  Inject,
  Injectable,
  Module,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Injectable()
class SpecialService {
  constructor(public readonly service: AppService) {
    console.log(
      `Hey! SpecialService here, my constructor has been called and the AppService is inyected correctly: `,
      service,
    );
  }
}

const SpecialSymbol = Symbol('Special Symbol');
class ClassOtherToken {}
const SimpleOtherToken = 'Token';

// If you uncomment any of two comments below (or both), all works as expected
@Module({
  controllers: [AppController],
  providers: [
    AppService,
    /* SpecialService, */ { provide: SpecialSymbol, useClass: SpecialService },
    { provide: ClassOtherToken, useClass: SpecialService },
    { provide: SimpleOtherToken, useClass: SpecialService },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Optional() /* @Inject(SpecialSymbol)  */ specialService: SpecialService,
    private moduleRef: ModuleRef,
  ) {
    console.log(`from ModuleRef`, this.moduleRef.get(SpecialSymbol));
    console.log(`from ModuleRef`, this.moduleRef.get(ClassOtherToken));
    console.log(`from ModuleRef`, this.moduleRef.get(SimpleOtherToken));
    console.log(`from DI`, specialService);
  }

  onModuleInit() {
    console.log(
      `from ModuleRef on ModuleInit`,
      this.moduleRef.get(SpecialSymbol),
    );
  }
}
