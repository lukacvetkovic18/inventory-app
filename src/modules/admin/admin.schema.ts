const adminSchema = {
    id: { type: "number" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    age: { type: "number" },
    password: { type: "string" },
    created: { type: "string" },
    role: { type: "string" }
  }

export const getAdminsSchema = {
  tags: ["admin"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: adminSchema
    }
  }
}
}

export const getAdminSchema = {
  tags: ["admin"],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: adminSchema
      }
      }
    }


export const postAdminSchema = {
  tags: ["admin"],
    body: {
      type: 'object',
      required: ['firstName',
        'lastName',
        'email',
        'password',
        'age',
        'role'
      ],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        phoneNumber: { type: "string" },
        age: { type: "number" },
        password: { type: "string" },
        role: { type: "string" }
      }
    },
    response: {
      200: {
        type: "string"
      }
    }
}

export const deleteAdminSchema = {
  tags: ["admin"],
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

export const putAdminSchema = {
  tags: ["admin"],
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

export const adminAuth = {
  tags: ['admin'],
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
export const whoamischema = {
  tags:["admins"],
  reponse: {
    200: {
      type: "object",
      properties: {
        role: {
          type: "string"
        }
      }
    }
  }
}