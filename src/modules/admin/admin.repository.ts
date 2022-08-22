import "fastify";
import { EntityRepository, getCustomRepository, getRepository, IsNull, Repository } from "typeorm";
import { Admin } from "./admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{
  public getAdmins() {
    return this.find();
  }

  public async getAdmin(id) {
    const admin = await this.findOne(id)
    return admin;
  }

  public async addAdmin(admin) {
    if(admin.role !== "Admin" && admin.role !== "SuperAdmin"){
      return "Role doesn't exist"
    }
    /*if(admin.role === "SuperAdmin"){
      const admin1 = await this.find({ where: { role: "SuperAdmin" }})
      if(admin1 !== null){
        return "SuperAdmin already exists"
      }
    } else{*/
      await this.save(this.create(admin));
      return "Admin created"
    //}
  }

  public async deleteAdmin(id) {
    const admin = await this.findOne(id);
    this.remove(admin);
    return `Deleted admin with id ${id}`
  }

  public async updateAdmin(id, data) {
    const admin = await this.findOne(id);
    this.update(admin, data)
    return `Updated admin with id ${id}`
  }
}