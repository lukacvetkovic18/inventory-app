import {
  getUsersSchema,
  getUserSchema,
  postUserSchema,
  deleteUserSchema,
  putUserSchema
} from "./user.schema";

export function userRoutes (fastify, options, done){

  //get all users
  fastify.get('/users', getUsersSchema)

  //get single user
  fastify.get('/users/:id', getUserSchema)

  //add new user
  fastify.post('/users', postUserSchema)

  //delete user
  fastify.delete('/users/:id', deleteUserSchema)

  //update user
  fastify.put('/users/:id', putUserSchema)
}