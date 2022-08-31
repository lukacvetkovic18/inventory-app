import "fastify";
import { EntityRepository, FindConditions, FindManyOptions, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { CashierRepository } from "../cashier/cashier.repository";
import { User } from "../user/user.entity";
import { Cashier } from "../cashier/cashier.entity";
import { UserRepository } from "../user/user.repository";
import { WarehouseWorkerRepository } from "../warehouseWorker/warehouseWorker.repository";
import { Admin } from "./admin.entity";
import { WarehouseWorker } from "../warehouseWorker/warehouseWorker.entity";
import { LogRepository } from "../log/log.repository";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{
  public getAdmins() {
    getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: "Got all admins"}))
    return this.find({ where: { banned: false } });
  }

  public async getAdmin(id) {
    const admin = await this.findOne(id)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Got admin ${id}`}))
    return admin;
  }

  public async addAdmin(admin) {
    if(admin.role !== "Admin" && admin.role !== "SuperAdmin"){
      return "Role doesn't exist"
    }
    if(admin.role === "SuperAdmin"){
      const admin1 = await this.findOne({ where: { role: "SuperAdmin" } })
      if(admin1){
        return "SuperAdmin already exists"
      }
    }
      await this.save(this.create(admin));
      await getCustomRepository(LogRepository)
        .save(getCustomRepository(LogRepository)
        .create({ description: `Added new ${admin.role}`}))
      return "Admin created"
  }

  public async deleteAdmin(id) {
    const admin = await this.findOne(id);
    if(admin.banned){
      return "Admin has been banned"
    }
    this.remove(admin);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Deleted admin ${id}`}))
    return `Deleted admin with id ${id}`
  }

  public async updateAdmin(id, data) {
    const admin = await this.findOne(id);
    if(admin.banned){
      return "Admin has been banned"
    }
    this.update(admin, data)
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Updated admin ${id}`}))
    return `Updated admin with id ${id}`
  }

  public async banUser(admin_id, mail) {
    const superAdmin = await this.findOne(admin_id)
    const admin = await this.findOne({ where: { email: mail }});
    let userMail = null  //?????
    const user = await getCustomRepository(UserRepository).findOne({ where: { email: mail }})
    const cashier = await getCustomRepository(CashierRepository).findOne({ where: { email: mail }})
    const worker = await getCustomRepository(WarehouseWorkerRepository).findOne({ where: { email: mail }})
    if(admin){
      await this
      .createQueryBuilder()
      .update(Admin)
      .set({ banned: true })
      .where("id = :id", { id: admin.id })
      .execute()
      userMail = admin.email;
    }
    else if(user){
      await getCustomRepository(UserRepository)
      .createQueryBuilder()
      .update(User)
      .set({ banned: true })
      .where("id = :id", { id: user.id })
      .execute()
      userMail = user.email
    }
    else if(cashier){
      await getCustomRepository(CashierRepository)
      .createQueryBuilder()
      .update(Cashier)
      .set({ banned: true })
      .where("id = :id", { id: cashier.id })
      .execute()
      userMail = cashier.email;
    }
    else if(worker){
      await getCustomRepository(WarehouseWorkerRepository)
      .createQueryBuilder()
      .update(WarehouseWorker)
      .set({ banned: true })
      .where("id = :id", { id: worker.id })
      .execute()
      userMail = worker.email;
    }
    const data = {
      sender: superAdmin.email,
      receiver: userMail
    }
    return data
  }

  public async changePassword(id, new_pass) {
    const admin = await this.findOne(id)
    if(admin.banned){
      return "Admin has been banned"
    }
    admin.password = new_pass;
    await this.save(admin);
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Changed admin ${id} password`}))
    return "Password changed successfuly"
  }
}