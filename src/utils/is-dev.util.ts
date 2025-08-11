import { ConfigService } from '@nestjs/config';

export const isDevUtil = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === 'development';
