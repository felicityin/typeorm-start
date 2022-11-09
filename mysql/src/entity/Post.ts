import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm"
  import { Category } from "./Category"
  import { User } from "./User"
  
  @Entity()
  export class Post {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column()
    title: string
  
    @Column("text")
    content: string

    @Column('boolean', {default: true})
    published: boolean

    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
}