SELECT * FROM posts
where lower(title) LIKE $1;