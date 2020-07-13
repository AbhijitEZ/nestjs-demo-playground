import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'test_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // We can change to false on production
};
