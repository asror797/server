import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: 'postgres',
  username:"asror",
  host: 'localhost',
  port: 5432,
  password: 'aaa13579#',
  database: "woodline",
  dropSchema: false,
//   logging:true,
  synchronize: true,
  entities: [path.join(__dirname, "..", "entities", "*.entity.{js,ts}")],
});


dataSource.initialize()