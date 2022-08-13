import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser
} from "./user.controller"

const userSchema = {
  type: "object",
  properties: {
    id: { type: "number", format: "uuid" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    age: { type: "number" },
    password: { type: "string" },
    lastLogin: { type: "Date" },
    balance: { type: "number" },
    purchases: { type: "array", items: "Purchase" }
    }
  }

export const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: "array",
        items: userSchema
      }
    }
  },
  handler: getUsers
}

export const getUserSchema = {
  schema: {
    response: {
      200: userSchema
    }
  },
  handler: getUser 
}

export const postUserSchema = {
  schema: {
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
        age: { type: "number" }
      }
    },
    response: {
      200: userSchema
    }
  },
  handler: addUser
}

export const deleteUserSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
  },
  handler: deleteUser
}

export const putUserSchema = {
  schema: {
    response: {
      200: userSchema
    }
  },
  handler: updateUser 
}