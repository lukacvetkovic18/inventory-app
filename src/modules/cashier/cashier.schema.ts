const cashierSchema = {
    id: { type: "number" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    age: { type: "number" },
    password: { type: "string" },
    created: { type: "string" },
    role: { type: "string"}
  }

export const getCashiersSchema = {
  tags: ["cashier"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: cashierSchema
    }
  }
}
}

export const getCashierSchema = {
  tags: ["cashier"],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: cashierSchema
      }
      }
    }


export const postCashierSchema = {
  tags: ["cashier"],
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
        email: { type: "string" },
        phoneNumber: { type: "string" },
        age: { type: "number" },
        password: { type: "string" },
      }
    },
    response: {
      200: {
        type: "string"
      }
    }
}

export const deleteCashierSchema = {
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

export const putCashierSchema = {
  tags: ["cashier"],
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

export const checkStockSchema = {
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
    id: { type: "number" },
    date: { type: 'string' }
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
}

export const checkTrafficSchema = {
  tags: ["cashier"],
  params: {
    id: {
      type: "number"
    },
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

export const printDataSchema = {
  tags: ["cashier"],
  params: {
    date: { type: 'string' }
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

export const cashierAuth = {
  tags: ['cashier'],
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
