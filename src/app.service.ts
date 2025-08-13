import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message:"Health check OK  🆗 "  };
  }
}
