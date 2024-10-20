import { Module, OnModuleInit } from '@nestjs/common';
import { connectToDb } from './db/utils';
import { JobsModule } from './jobs/jobs.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [JobsModule, UserModule],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await connectToDb();
  }
}
