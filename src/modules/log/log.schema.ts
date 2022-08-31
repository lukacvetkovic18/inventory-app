const logSchema = {
    id: { type: "number" },
    description: { type: "string" },
    date: { type: "string" }
  }

export const getAllLogsSchema = {
  tags: ["log"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const getLogsOnDateSchema = {
  tags: ["log"],
  params: {
    date: { type: 'string' }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const getLogsInMonthSchema = {
  tags: ["log"],
  params: {
    month: { type: 'string' }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const getLogsInYearSchema = {
  tags: ["log"],
  params: {
    year: { type: 'string' }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const getLogsByKeywordSchema = {
  tags: ["log"],
  params: {
    keyword: { type: 'string' }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const getLogsByDateAndKeywordSchema = {
  tags: ["log"],
  params: {
    date: { type: 'string' },
    keyword: { type: 'string' }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const sortLogsSchema = {
  tags: ["log"],
  params: {
    asc_desc: { type: 'string' },
    take: { type: 'number' },
    skip: { type: 'number' }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: logSchema
      }
    }
  }
}

export const deleteLogSchema = {
  tags: ["log"],
  params: {
    id: { type: "number" }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {type: 'string'}
      }
    }
  }
}
