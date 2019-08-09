INSERT INTO user_info(username, profile_img)
VALUES(${username}, ${profileimg})
RETURNING *;