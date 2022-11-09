import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm"
import { Post } from "./Post"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(() => Post, (post) => post.user)
    @JoinTable()
    posts: Post[]
}
