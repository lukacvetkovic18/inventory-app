const workerSchema = {
    id: { type: "number"},
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    age: { type: "number" },
    password: { type: "string" },
    lastLogin: { type: "string" },
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
        lastLogin: {type: "string"},
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
      lastLogin: {type: "string"}
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
      warehouse_id: {
        type: "number"
      },
      product_ids: {
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

/*export const checkStockSchema = {
  tags: ["cashier"],
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

export const checkDailyTrafficSchema = {
  tags: ["cashier"],
  params: {
    id: {
      type: "number"
    },
    date: {
      type: 'string'
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

export const addProductSchema = {
  tags: ["cashier"],
  params: {
    id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      stockState: { type: "number" }
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

export const removeProductSchema = {
  tags: ["cashier"],
  params: {
    cashier_id: {
      type: "number"
    },
    product_id: {
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

export const returnMoneySchema = {
  tags: ["cashier"],
  params: {
    cashier_id: {
      type: "number"
    },
    user_id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      balance: {type: "number"}
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
}*/

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
    }
  }
}
