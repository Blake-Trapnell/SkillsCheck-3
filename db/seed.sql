
DROP TABLE posts;
DROP TABLE credentials;
DROP TABLE user_info;

CREATE TABLE user_info (
user_id SERIAL PRIMARY KEY, 
username VARCHAR(50), 
profile_img TEXT );

CREATE TABLE credentials(
user_id INT,
hash TEXT);

CREATE TABLE posts (
post_id SERIAL PRIMARY KEY,
title VARCHAR(45),
author VARCHAR(45),
img TEXT,
content TEXT,
author_id INT REFERENCES user_info(user_id)
);

-- Insert Into Posts ( title, img, content, author_id)
-- VALUES ('Aces first post', 'https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/mew.png', 'Mew is pink and cool', 1 );
