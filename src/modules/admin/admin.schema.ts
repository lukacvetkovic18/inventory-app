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
      },
      201: {
        type: "string"
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

export const banUserSchema = {
  tags: ["admin"],
  body: {
    type: 'object',
    properties: {
      adminId: { type: "number" },
      userMail: { type: "string" },
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        sender : { type: "string" },
        receiver : { type: "string" }
      }
    }
  }
}

export const adminGenMfa = {
  tags: ['admin'],
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

export const adminCompMfa = {
  tags: ['admin'],
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

export const adminMfaAuth = {
  tags: ['admin'],
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
export const whoamischema = {
  tags:["admin"],
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
export const changePasswordSchema = {
  tags: ["admin"],
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