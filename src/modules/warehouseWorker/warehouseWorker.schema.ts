const workerSchema = {
    id: { type: "number"},
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    age: { type: "number" },
    password: { type: "string" },
    created: { type: "string" },
    role: { type: "string" }
  }

export const getWorkersSchema = {
  tags: ["warehouseWorker"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: workerSchema
    }
  }
}
}

export const getWorkerSchema = {
  tags: ["warehouseWorker"],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: workerSchema
      },
      201: {
        type: "string"
      }
      }
    }


export const postWorkerSchema = {
  tags: ["warehouseWorker"],
    body: {
      type: 'object',
      required: ['firstName',
        'lastName',
        'email',
        'password',
        'age'
      ],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        password: {type: "string"},
        email: { type: "string" },
        phoneNumber: { type: "string" },
        age: { type: "number" },
      }
    },
    response: {
      200: {
        type: "string"
      }
    }
}

export const deleteWorkerSchema = {
  tags: ["warehouseWorker"],
  params: {
    id: {
      type: "number"
    }
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

export const putWorkerSchema = {
  tags: ["warehouseWorker"],
  params: {
    id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      phoneNumber: { type: "string" },
      age: { type: "number" },
      password: { type: "string" },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
}}

export const transferProductsSchema = {
  tags: ["warehouseWorker"],
  params: {
    worker_id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      amounts: {
        type: "array",
        items: { type: "number" }
      }
    }
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

export const workerGenMfa = {
  tags: ['warehouseWorker'],
  body: {
      type: "object",
      properties: {
        email: {
          type: "string"
        }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        token:{
          type: "string"
        }
      }
    },
    401: {
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    },
  }
}

export const workerCompMfa = {
  tags: ['warehouseWorker'],
  body: {
      type: "object",
      properties: {
        email: {
          type: "string"
        },
        mfaToken: {
          type: "string"
        }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        isValid:{
          type: "boolean"
        }
      }
    },
    401: {
      type: "object",
      properties: {
        isValid: {
          type: "boolean"
        }
      }
    },
  }
}

export const workerMfaAuth = {
  tags: ['warehouseWorker'],
  body: {
    type: "object",
    properties: {
      email: {
        type: "string"
      },
      mfaToken: {
        type: "string"
      }
  }
},
  response: {
    200: {
      type: "object",
      properties: {
        token:{
          type: "string"
      }
    }
    },
    401: {
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    },
    403: {
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    }
  }
}

export const workerAuth = {
  tags: ['warehouseWorker'],
  body: {
      type: "object",
      properties: {
        email: {
          type: "string"
        },
        password: {
          type: "string"
        }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        token:{
          type: "string"
      }
    }
    },
    401: {
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    },
    403: {
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    }
  }
}

export const changePasswordSchema = {
  tags: ["warehouseWorker"],
  params: {
    id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      new_pass: { type: "string" }
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
}
