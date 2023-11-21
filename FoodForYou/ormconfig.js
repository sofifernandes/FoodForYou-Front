module.exports = {
    type: "mysql", 
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "db_food_for_you",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
    seeds: ['src/seeds/**/*{.ts,.js}'],
    factories: [`${__dirname}/src/factories/**/*{.ts,.js}`],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers",
    },
  };
  