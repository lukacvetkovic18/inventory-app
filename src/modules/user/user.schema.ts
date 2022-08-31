const userSchema = {
    id: { type: "number" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    age: { type: "number" },
    password: { type: "string" },
    created: { type: "string" },
    balance: { type: "number" },
    role: { type: "string" }
  }

export const getUsersSchema = {
  tags: ['user'],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: userSchema
      }
    }
  }
}

export const getUserSchema = {
  tags: ['user'],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: userSchema
      },
      201: {
        type: "string"
      }
      }
    }


export const postUserSchema = {
  tags: ['user'],
    body: {
      type: 'object',
      required: ['firstName',
        'lastName',
        'email',
        'phoneNumber',
        'age'
      ],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        phoneNumber: { type: "string" },
        age: { type: "number" },
        password: { type: "string" },
        balance: { type: "number" }
      }
    },
    response: {
      200: {
        type: "string"
      }
    }
}

export const deleteUserSchema = {
  tags: ['user'],
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

export const putUserSchema = {
  tags: ['user'],
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
      balance: { type: "number" }
    },
    response: {
      type: 'object',
      properties: {
        message: {type: 'string'}
      }
    }
}}

export const purchaseProductsSchema = {
  tags: ['user'],
  params: {
    user_id: { type: "number" }
  },
  body: {
    type: "object",
    properties: {
      cashier_id: { type: "number" },
      amounts: {
        type: "array",
        items: { type: "number" }
      },
      discount: { type: "number" },
      granted: { type: "boolean" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        message:{
          type: "string"
        }
      }
    }
  }
}

export const getAllPurchasesFromUserSchema = {
  tags: ['user'],
  params: {
    id: { type: "number" }
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "number" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        phoneNumber: { type: "string" },
        age: { type: "number" },
        created: { type: "string" },
        balance: { type: "number" },
        role: { type: "string" },
        purchases: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              created: { type: "string" },
              sum: { type: "number" },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    stockState: { type: "number" },
                    warehouseState: { type: "number" },
                    warehouse: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        location: { type: "string" },
                        workers: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "number" },
                              firstName: { type: "string" },
                              lastName: { type: "string" },
                              email: { type: "string" },
                              phoneNumber: { type: "string" },
                              age: { type: "number" },
                              created: { type: "string" },
                              balance: { type: "number" },
                              role: { type: "string" },
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export const userGenMfa = {
  tags: ['user'],
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

export const userCompMfa = {
  tags: ['user'],
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

export const userMfaAuth = {
  tags: ['user'],
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

export const userAuth = {
  tags: ['user'],
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
    429: {
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
  tags: ["user"],
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
}}