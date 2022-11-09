import { getManager } from "typeorm"
import { AppDataSource } from "./data-source"
import { Category } from "./entity/Category"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {
    // ----------- save ------------------
    const category1 = new Category()
    category1.name = "TypeScript"
    await AppDataSource.manager.save(category1)

    const category2 = new Category()
    category2.name = "Programming"
    await AppDataSource.manager.save(category2)

    const post = new Post()
    post.title = "TypeScript"
    post.content = `TypeScript is Awesome!`
    post.categories = [category1, category2]

    await AppDataSource.manager.save(post)

    console.log("Post has been saved: ", post)

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    user.posts = [post]
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    // ----------- get ------------------
    const post1 = await AppDataSource.getRepository(Post).find({
        where: { published: true },
        relations: ['user'],
    })
    console.log("Loaded posts: ", post1)

    console.log("Here you can setup and run express / fastify / any other framework.")


}).catch(error => console.log(error))
