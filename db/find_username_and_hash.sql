SELECT * FROM user_info u
JOIN credentials c ON c.user_id = u.user_id
WHERE username = $1;