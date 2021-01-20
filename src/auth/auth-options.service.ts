import { Injectable, Logger } from '@nestjs/common';
import { AuthModuleOptions, AuthOptionsFactory } from '@nestjs/passport';

@Injectable()
export class AuthOptionsService implements AuthOptionsFactory {
  createAuthOptions(): AuthModuleOptions {
    Logger.debug('Init', this.constructor.name);

    return {
      defaultStrategy: 'jwt',
    };
  }
}
