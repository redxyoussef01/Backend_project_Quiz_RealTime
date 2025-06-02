import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Quiz } from "./entity/Quiz";
import { Question } from "./entity/Question";
import { Note } from "./entity/Note";
import { Account } from "./entity/Account";
import { Enroll } from "./entity/Enroll";
import * as dotenv from 'dotenv';
import * as mysql2 from 'mysql2';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  driver: mysql2,
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",  // Using 'root' as the password
  database: "quiz",
  synchronize: true,
  logging: true,
  entities: [User, Question, Quiz, Note, Account, Enroll],
  migrations: [],
  subscribers: [],
  extra: {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
});
AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
