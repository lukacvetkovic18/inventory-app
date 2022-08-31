import "fastify";
import { EntityRepository, Repository } from "typeorm";
import { whoamischema } from "../admin/admin.schema";
import { Log } from "./log.entity"

@EntityRepository(Log)
export class LogRepository extends Repository<Log>{
  public async getAllLogs() {
    this.save(this.create({ description: `Got all logs` }))
    return await this.find();
  }

  public async getLogsOnDate(date: string) {
    await this.save(this.create({ description: `Got all logs on ${date}` }))
    return await this.find({ where: { date: date } })
  }

  public async getLogsInMonth(month: string) {
    let logs = await this.find()
    logs = logs.filter(log => log.date.substring(5, 7) === month)
    await this.save(this.create({ description: `Got all logs in ${month} month` }))
    return logs
  }

  public async getLogsInYear(year: string) {
    let logs = await this.find()
    logs = logs.filter(log => log.date.substring(0, 4) === year)
    await this.save(this.create({ description: `Got all logs in ${year}.` }))
    return logs
  }

  public async getLogsByKeyword(keyword: string) {
    let logs = await this.find()
    logs = logs.filter(log => log.description.toLowerCase().includes(keyword))
    await this.save(this.create({ description: `Got all logs that contain "${keyword}"` }))
    return logs
  }

  public async getLogsByDateAndKeyword(date: string, keyword: string) {
    let logs = await this.find({ where: { date: date } })
    logs = logs.filter(log => log.description.toLowerCase().includes(keyword))
    await this.save(this.create({ description: `Got all logs on ${date} that contain "${keyword}"` }))
    return logs
  }

  public async sortLogs(asc_desc: string, take: number, skip: number) {
    let logs = await this.find({ take: take, skip: skip })
    logs.sort((a, b) => {
      let fa = a.description
      let fb = b.description
      if(fa < fb) {
        return -1
      }
      if(fa > fb) {
        return 1
      }
      return 0
    });
    if(asc_desc==="asc") {
      await this.save(this.create({ description: `Sorted all logs in ascending order` }))
    }else if(asc_desc==="desc") {
      logs.reverse()
      await this.save(this.create({ description: `Sorted all logs in descending order` }))
    }else {
      return "Invalid sort type"
    }
    return logs;
  }

  public async deleteLog(id) {
    const log = await this.findOne(id);
    this.remove(log);
    await this.save(this.create({ description: `Deleted log ${id}` }))
    return `Deleted log with id ${id}`
  }
}