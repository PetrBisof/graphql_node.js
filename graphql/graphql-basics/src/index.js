import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

let users = [{
    id:'1',
    name: 'Bob',
    email: 'vs@gmail.tu',
    age: 43
},{
    id:'2',
    name: 'Bobobobo',
    email: 'tuevs@gmail.tu',
    age: 23
},{
    id:'3',
    name: 'Pucmeloun',
    email: 'broucci@gmail.tu',
    age: 65
}
]

let comments = [{
    id:'500',
    text: 'Aha bla bla',
    author: '1',
    post: '10'
},{
    id:'501',
    text: 'Yes aha',
    author: '1',
    post: '11'
},{
    id:'502',
    text: 'it works!',
    author: '2',
    post: '11'
},{
    id:'503',
    text: 'Not responding :(',
    author: '3',
    post:'11'
},
]

let posts = [{
        id: '10',
        title: 'GraphQL 101',
        body: 'This is how to use GraphQL...',
        published: true,
        author: '1'
    }, {
        id: '11',
        title: 'GraphQL 201',
        body: 'This is an advanced GraphQL post...',
        published: false,
        author: '1'
    }, {
        id: '12',
        title: 'Programming Music',
        body: '',
        published: false,
        author: '2'
    }]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: String!
        post: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
const resolvers = {
    Query: {
        users(parent, args, ctx, info){
           if (!args.query) {
               return users
           }

           return users.filter((user) => {
               return user.name.toLowerCase().includes(args.query.toLowerCase())
           })
        },
        
        me() {
            return {
                id: '1223',
                name: 'Bobo',
                email: 'mamamia@gmail.it'
            }
        },
        comments(parent, args, ctx, info) {
            return comments
/*                         if (!args.query) {
                            return posts
                        }
            
                        return posts.filter((post) => {
                            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                            return isTitleMatch || isBodyMatch
                        }) */
                   },
        posts(parent, args, ctx, info) {
                        if (!args.query) {
                            return posts
                        }
            
                        return posts.filter((post) => {
                            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                            return isTitleMatch || isBodyMatch
                        })
                   },

        },
        Mutation: {
            createUser(parent, args, ctx, info) {
                const emailTaken = users.some((user) =>{
                    return user.email === args.email
                    })
                    if (emailTaken) {
                        throw new Error('Email taken.')
                    }

              
                    const user = {
                        id: uuidv4(),
                        ...args.data
                    }

                    users.push(user)

                    return user
            },
            deleteUser(parent, args, ctx, info){
                
                const userIndex =  users.findIndex((user) => {
                    return user.id === args.id
                })

                if(userIndex === -1 ){
                    throw new Error('User not found')
                }

                const deletedUsers = users.splice(userIndex, 1)

                posts = posts.filter((post)=> {
                    const match = post.author === args.id

                    if(match){
                        comments = comments.filter((comment) =>{
                            return comment.post !== post.id
                        })
                    }

                    return !match
                })
                comments = comments.filter((comment) => comments.author !== args.id)
 
                return deletedUsers[0]
            },
            createPost(parent, args, ctx, info){
                const userExists = users.some((user) => user.id === args.data.author)

                if (!userExists) {
                    throw new Error('User not found')
                }

                const post = {
                    id: uuidv4(),
                    ...args.data
                }
                posts.push(post)
                    return post
            },
            createComment(parent, args, ctx, info){
                const userExists = users.some((user) => user.id === args.data.author)

                if (!userExists) {
                    throw new Error('User not found')
                }

                const postExists = posts.some((post) => post.id === args.data.post && post.published)

                if (!postExists) {
                    throw new Error('Post not found')
                }

                const comment = {
                    id: uuidv4(),
                    ...args.data
                    }
                comments.push(comment)
                    return comment
            }
        },
        Post: {
            author(parent, args, ctx, info){
                return users.find((user)=>{
                    return user.id === parent.author
                })
            },
            comments(parent, args, ctx, info){
                return comments.filter((comment) => {
                    return comment.post === parent.id
                })
            }
        },
        User: {
            posts(parent, args, ctx, info){
                return posts.filter((post) => {
                    return post.author === parent.id
                })
            },
            comments(parent, args, ctx, info){
                return comments.filter((post) => {
                    return post.author === parent.id
                })
            }
        },
        Comment: {
            author(parent, args, ctx, info){
                return users.find((user)=>{
                    return user.id === parent.author
                })
            },
            post(parent, args, ctx, info){
                return posts.find((post)=>{
                    return post.id === parent.post
                })
            }
        }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
 /*    console.log('Server is running!') */
})