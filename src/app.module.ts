import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AreaModule } from './area/area.module';

@Module({
  imports: [UserModule, AreaModule],
})
export class AppModule {}
