const Query = {users(parent, args, { db }, info){
    if (!args.query) {
        return db.users
    }

    return db.users.filter((user) => {
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
 comments(parent, args, { db }, info) {
     return db.comments
/*                         if (!args.query) {
                     return posts
                 }
     
                 return posts.filter((post) => {
                     const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                     const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                     return isTitleMatch || isBodyMatch
                 }) */
            },
 posts(parent, args, { db }, info) {
                 if (!args.query) {
                     return db.posts
                 }
     
                 return db.posts.filter((post) => {
                     const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                     const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                     return isTitleMatch || isBodyMatch
                 })
            },
 }

 export { Query as default }