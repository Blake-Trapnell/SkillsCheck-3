CREATE TABLE user_info (
user_id SERIAL PRIMARY KEY, 
username VARCHAR(50), 
profile_img TEXT );

CREATE TABLE credentials(
user_id INT,
hash TEXT);

