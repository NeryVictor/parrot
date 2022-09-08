import { MainSeeder } from "./infrastructure/database/seeds/MainSeeder";
import "dotenv/config";
import "reflect-metadata";
import { DataSourceOptions } from "typeorm";

import { DataSource } from "typeorm";
import { SeederOptions } from "typeorm-extension";

const port = process.env.DB_PORT as number | undefined;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/infrastructure/database/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/infrastructure/database/migrations/*.{ts,js}`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
