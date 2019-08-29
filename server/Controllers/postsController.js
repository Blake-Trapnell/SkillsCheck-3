module.exports = {
    getPosts: async (req,res) => {
        
        console.log('hit')
        const db = req.app.get('db')
        
        let posts = await db.get_all_posts()
        res.status(200).send(posts)
    },
    post: async (req,res) => {
        console.log(req.body)
        const {author_id, author, title, img, content} = req.body
        const db = req.app.get('db')
        let newpost = await db.create_post({author_id, author, title, img, content})
    }
    }
