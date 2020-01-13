import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.101:4466'
})

/* prisma.query.comments(null, '{ id text author { id name } }').then((data) =>{
    console.log(JSON.stringify(data, undefined, 2))
}) */

/* prisma.exists.Comment({
    id: "abc123"
}).then((exists)=>{
    console.log(exists)
})
 */
const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId})

    if (!userExists) {
        throw new Error('not found user')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published} } }')

    return post.author
}

createPostForUser('ck58b21gk001d089018j9joz1', {
    title: 'Great books to read',
    body: 'Mikes',
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
    console.log(error)
})

/* prisma.mutation.createPost({
    data: {
        title: "New title 2",
        body: "It is blablabla",
        published: true,
        author: {
            connect: {
                id: "ck58b21gk001d089018j9joz1"
            }
        }
    }
}, '{ id title body published}').then((data) => {
    console.log(data)
    return prisma.query.users(null, '{ id name posts { id title } }')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
}) 
 */


/* prisma.mutation.updatePost({
        where: {
            id: "ck59gdslt004t08909dhz6q5o"
        },
         data: {
             title: "GraphQL 101",
             body: "",
             published: true,
             author: {
                 connect: {
                     id: "ck58b21gk001d089018j9joz1"
                 }
             }
         }
     }, '{ id title body published }').then((data) => {
         console.log(data)
         return prisma.query.posts(null, '{ id title body published }')
     }).then((data) => {
         console.log(JSON.stringify(data, undefined, 2))
     }) */

/*     const updatePostForUser = async (postId, data) => {
        const post = await prisma.mutation.updatePost({
            where:{
                id: postId
            },
            data
            
        }, '{ author { id } }')
        const user = await prisma.query.user({
            where: {
                id: post.author.id
            }
        }, '{ id name email posts { id title published } }')
        return user
    }

    updatePostForUser('ck59k5ekj005v0890vz4hv1so', {
        published: false
    }).then((user) => {
        console.log(JSON.stringify(user, undefined, 2))
    }) */ 