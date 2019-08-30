SELECT * FROM posts
where title LIKE $2
AND author_id != $1