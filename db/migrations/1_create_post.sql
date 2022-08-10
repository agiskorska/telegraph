DROP TABLE IF EXISTS post;

CREATE TABLE post (
    id serial  PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    body VARCHAR(200) NOT NULL
)
