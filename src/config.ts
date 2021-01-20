export const config = () => ({
  port: Number(process.env.PORT),
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
});
