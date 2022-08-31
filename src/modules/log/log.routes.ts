import {
  getAllLogsSchema,
  getLogsOnDateSchema,
  deleteLogSchema,
  getLogsInMonthSchema,
  getLogsInYearSchema,
  getLogsByKeywordSchema,
  getLogsByDateAndKeywordSchema,
  sortLogsSchema
} from "./log.schema";
import logController from "./log.controller";


export default async (fastify, opts) =>{
  const logCtl = logController(fastify);
  
  fastify.route({
    method: "GET",
    url: "/logs",
    handler: (await logCtl).getAllLogs,
    schema: getAllLogsSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "GET",
    url: "/logs/date/:date",
    handler: (await logCtl).getLogsOnDate,
    schema: getLogsOnDateSchema,
    preValidation: [fastify.adminACL]
  });

  fastify.route({
    method: "GET",
    url: "/logs/month/:month",
    handler: (await logCtl).getLogsInMonth,
    schema: getLogsInMonthSchema,
    preValidation: [fastify.adminACL]
  });

  fastify.route({
    method: "GET",
    url: "/logs/year/:year",
    handler: (await logCtl).getLogsInYear,
    schema: getLogsInYearSchema,
    preValidation: [fastify.adminACL]
  });

  fastify.route({
    method: "GET",
    url: "/logs/keyword/:keyword",
    handler: (await logCtl).getLogsByKeyword,
    schema: getLogsByKeywordSchema,
    preValidation: [fastify.adminACL]
  });

  fastify.route({
    method: "GET",
    url: "/logs/date_keyword/:date/:keyword",
    handler: (await logCtl).getLogsByDateAndKeyword,
    schema: getLogsByDateAndKeywordSchema,
    preValidation: [fastify.adminACL]
  });

  fastify.route({
    method: "GET",
    url: "/logs/sort/:asc_desc/:take/:skip",
    handler: (await logCtl).sortLogs,
    schema: sortLogsSchema,
    preValidation: [fastify.adminACL]
  });
  
  fastify.route({
    method: "DELETE",
    url: "/logs/:id",
    handler: (await logCtl).deleteLog,
    schema: deleteLogSchema,
    preValidation: [fastify.adminACL]
  });
}