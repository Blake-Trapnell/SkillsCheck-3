module.exports = {
    getAll: async (req,res) => {
        const db = req.app.get('db')
        let posts = await db.get_all_posts()
        console.log(posts)
        return res.status(200).send(posts)
    } 
    }
