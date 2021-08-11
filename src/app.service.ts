import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  hi = 'world'
  
  getHello(): string {
    return 'Hello World!';
  }
}
