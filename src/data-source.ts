import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Quiz } from "./entity/Quiz";
import { Question } from "./entity/Question";
import { Note } from "./entity/Note";
import { Account } from "./entity/Account";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "quiz",
  synchronize: true,
  logging: false,
  entities: [User, Question, Quiz, Note, Account],
  migrations: [],
  subscribers: [],
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
