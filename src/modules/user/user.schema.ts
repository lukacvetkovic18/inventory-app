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
      product_ids: {
        type: "array",
        items: { type: "number" }
      }
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
    }
  }
}
