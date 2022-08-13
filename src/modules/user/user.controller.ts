import { UserRepository } from "./user.repository";

const { v4:uuidv4 } = require('uuid');

export const getUsers = async (req, reply) => {
  const users = await UserRepository.find({
    relations: ["purchases"]
  })
  reply.send(users)
}

export const getUser = async (req, reply) => {
  const user = await UserRepository.findOne(req.params.id)
  reply.send(user)
}

export const addUser = async (req, reply) => {
  const { firstName, lastName, email, phoneNumber, age, balance} = req.body
  const newUser = await UserRepository.create({
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    lastLogin: Date(),
    balance
  })
  const result = await UserRepository.save(newUser)
  reply.send(result)
}

export const deleteUser = async (req, reply) => {
  const user = await UserRepository.findOneBy({id : req.params.id})
  await UserRepository.remove(user)
  reply.send({message: "User has been removed."})
}

export const updateUser = async (req, reply) => {
  const user = await UserRepository.findOneBy({id : req.params.id})
  await UserRepository.update(user, req.body)
  reply.send(req.body)
}

export const purchaseProduct = async (req, reply) => {
  const products = req.params.products
  //const user = 
}