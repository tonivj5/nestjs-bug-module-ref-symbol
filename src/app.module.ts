import { Inject, Injectable, Module, Optional } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Injectable()
class SpecialService {
  constructor(public readonly service: AppService) {
    console.log(`Hey! SpecialService here, my constructor has been called and the AppService is inyected correctly: `, service);
  }
}

const SpecialSymbol = Symbol('Special Symbol');

// If you uncomment any of two comments below (or both), all works as expected
@Module({
  controllers: [AppController],
  providers: [AppService, /* SpecialService, */ { provide: SpecialSymbol, useClass: SpecialService }],
})
export class AppModule {
  constructor(
    @Optional() @Inject(SpecialSymbol) specialService: SpecialService,
    private moduleRef: ModuleRef,
  ) {
    // It works as expected...
    // console.log(`from ModuleRef`, this.moduleRef.get(SpecialService))
    console.log(`from ModuleRef`, this.moduleRef.get(SpecialSymbol))
    console.log(`from DI`, specialService)
  }
}
