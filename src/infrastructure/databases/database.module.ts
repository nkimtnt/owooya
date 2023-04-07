import { Module } from '@nestjs/common';
import { mysqlMaster, mysqlSlave, mysqlStat } from './mysql/mysql.providers';

@Module({
  providers: [...mysqlMaster, ...mysqlSlave, ...mysqlStat],
  exports: [...mysqlMaster, ...mysqlSlave, ...mysqlStat],
})
export class DatabaseModule {}
