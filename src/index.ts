import { AppDataSource } from "./data-source"
import { User } from "./modules/user/user.entity"
import fastify from "fastify"
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";

export const server = fastify();

/*server.register(fastifySwagger {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'inventory-app-tester'}
    }
})*/

server.register(fastifyJwt, {
  secret: 'pssst'
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

/*AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))*/
