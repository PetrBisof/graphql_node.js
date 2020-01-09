const users = [{
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

const comments = [{
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

const posts = [{
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

    const db = {
        users,
        posts,
        comments
    }

    export { db as default }