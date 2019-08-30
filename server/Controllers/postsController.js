module.exports = {
    getPosts: async (req,res) => {
        const db = req.app.get('db')
        let {user_id, search, userposts} = req.query
        if(userposts === "false" && search == "") {
            let posts = await db.get_all_posts()
            res.status(200).send(posts)
            return
        }
        else if (userposts == "true" && search == "") {
            let posts = await db.get_other_posts([user_id])
            res.status(200).send(posts)
            return
        }
        else if (userposts === "false" && search !== "") {
            search = search.toLowerCase()
            let posts = await db.get_all_posts_searched(["%" + search + "%"])

            res.status(200).send(posts)
            return
        }
        else if(userposts === "true" && search !== "") {
            let posts = await db.get_other_posts_searched([user_id, "%" + search + "%"])
            res.status(200).send(posts)
            return
        }
    },
    post: async (req,res) => {
        const {author_id, author, title, img, content} = req.body
        const db = req.app.get('db')
        let newpost = await db.create_post({author_id, author, title, img, content})
    }
    }
