import { getCustomRepository } from "typeorm";
import { LogRepository } from "./log.repository";

export default async (server) =>{
  const lR = getCustomRepository(LogRepository);
  
  const getAllLogs = async (req, reply) => {
    try {
      return await lR.getAllLogs();
    }
    catch(e){
      console.error(e);
    }
  }

  const getLogsOnDate = async (req, reply) => {
    try {
      return await lR.getLogsOnDate(req.params.date)
    }
    catch(e){
      console.error(e);
    }
  }

  const getLogsInMonth = async (req, reply) => {
    try {
      return await lR.getLogsInMonth(req.params.month)
    }
    catch(e){
      console.error(e);
    }
  }

  const getLogsInYear = async (req, reply) => {
    try {
      return await lR.getLogsInYear(req.params.year)
    }
    catch(e){
      console.error(e);
    }
  }

  const getLogsByKeyword = async (req, reply) => {
    try {
      return await lR.getLogsByKeyword(req.params.keyword)
    }
    catch(e){
      console.error(e);
    }
  }

  const getLogsByDateAndKeyword = async (req, reply) => {
    try {
      return await lR.getLogsByDateAndKeyword(req.params.date, req.params.keyword)
    }
    catch(e){
      console.error(e);
    }
  }

  const sortLogs = async (req, reply) => {
    try {
      return await lR.sortLogs(req.params.asc_desc, req.params.take, req.params.skip)
    }
    catch(e){
      console.error(e);
    }
  }

  const deleteLog = async (req, reply) =>{
    try{
      return await lR.deleteLog(req.params.id);
    }
    catch(e){
      console.error(e);
    }
  }

  return {
    getAllLogs,
    getLogsOnDate,
    getLogsInMonth,
    getLogsInYear,
    getLogsByKeyword,
    getLogsByDateAndKeyword,
    sortLogs,
    deleteLog
  }
}