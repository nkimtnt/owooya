import { DataSource } from 'typeorm';

export const mysqlMaster = [
  {
    provide: 'MYSQL_MASTER',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities:
          process.env.NODEMON_START === 'TRUE'
            ? ['src/services/entities/service/**/*.entity{.ts,.js}']
            : ['./dist/src/services/entities/service/**/*.entity{.ts,.js}'],
        logging: process.env.ENVIRONMENT === 'development',
        synchronize: false,
        charset: 'utf8mb4',
        extra: {
          connectionLimit: process.env.ENVIRONMENT === 'development' ? 18 : 38,
        },
      });
      return datasource.initialize();
    },
  },
];

export const mysqlSlave = [
  {
    provide: 'MYSQL_SLAVE',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_SLAVE_HOST,
        port: 3306,
        username: process.env.MYSQL_SLAVE_USER,
        password: process.env.MYSQL_SLAVE_PASSWORD,
        database: process.env.MYSQL_SLAVE_DATABASE,
        entities:
          process.env.NODEMON_START === 'TRUE'
            ? ['src/services/entities/service/**/*.entity{.ts,.js}']
            : ['./dist/src/services/entities/service/**/*.entity{.ts,.js}'],
        logging: process.env.ENVIRONMENT === 'development',
        synchronize: false,
        charset: 'utf8mb4',
        extra: {
          connectionLimit: process.env.ENVIRONMENT === 'development' ? 15 : 60,
        },
      });
      return datasource.initialize();
    },
  },
];

export const mysqlStat = [
  {
    provide: 'MYSQL_STAT',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_STAT_HOST,
        port: 3306,
        username: process.env.MYSQL_STAT_USER,
        password: process.env.MYSQL_STAT_PASSWORD,
        database: process.env.MYSQL_STAT_DATABASE,
        entities:
          process.env.NODEMON_START === 'TRUE'
            ? ['src/services/entities/service/**/*.entity{.ts,.js}']
            : ['./dist/src/services/entities/service/**/*.entity{.ts,.js}'],
        logging: process.env.ENVIRONMENT === 'development',
        synchronize: false,
        charset: 'utf8mb4',
        extra: {
          connectionLimit: process.env.ENVIRONMENT === 'development' ? 15 : 60,
        },
      });
      return datasource.initialize();
    },
  },
];
