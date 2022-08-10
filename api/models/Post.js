const db = require('../dbconfig/init');

module.exports = class Post {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.nickname = data.nickname
        this.body = data.body
    }

    static async findById(id){
            const data = await db.query('SELECT * FROM post WHERE id = $1;', [id]);
            const post = new Post(data.rows[0]);
            if(!post.id){
                console.log(post)
                throw new Error("No posts found");
            }
            return post;
    }
    
    static async createNew(body){
            const data = await db.query(`INSERT INTO post (title, nickname, body)
                                         VALUES ($1, $2, $3)
                                      RETURNING *;`, [body.title, body.nickname, body.body]);
            const post = new Post(data.rows[0]);
            if(!post.id){
                throw new Error("No posts found");
            }
            return post;
    }
        
    async update(id, title, nickname, body){
            const currentTitle = title || this.title
            const currentNickname = nickname || this.nickname
            const currentBody = body || this.body
            console.log(currentTitle, currentNickname, currentBody)
            const update = await db.query(`UPDATE post
                                              SET title    = $1,
                                                  nickname = $2,
                                                  body     = $3
                                            WHERE id = $4
                                        RETURNING *;`, [currentTitle, currentNickname, currentBody, id]);
            const post = new Post(update.rows[0]);
            if(!post.id){
                throw new Error("No posts found");
            }
            return post;
    }

    static async destroy(id){
            const destroy = await db.query(`DELETE FROM post
                                             WHERE id = $1
                                        RETURNING *;`, [id]);
            return destroy;
    }
}