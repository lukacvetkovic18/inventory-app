import { AppDataSource } from "../../data-source";
import { User } from "./user.entity";

export const UserRepository = AppDataSource.getRepository(User)