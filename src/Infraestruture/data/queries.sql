CREATE TABLE
    user_labook (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    post_labook (
        id VARCHAR(255) PRIMARY KEY,
        photo VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        type ENUM('normal', 'event') DEFAULT 'normal',
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        author_id VARCHAR(255),
        FOREIGN KEY (author_id) REFERENCES user_labook (id)
    );

CREATE TABLE
    friend_labook(
        id VARCHAR(255) PRIMARY KEY,
        id_friend_one VARCHAR(255), /* user */
        id_friend_two VARCHAR(255), /* friend */
        FOREIGN KEY (id_friend_one) REFERENCES user_labook (id),
        FOREIGN KEY (id_friend_two) REFERENCES user_labook (id)
    );

CREATE TABLE
    like_Post(
        id VARCHAR(255) PRIMARY KEY,
        id_user VARCHAR(255),
        id_post VARCHAR(255),
        FOREIGN KEY (id_user) REFERENCES user_labook (id),
        FOREIGN KEY (id_post) REFERENCES post_labook (id)
    );

CREATE TABLE
    comment_post(
        id VARCHAR(255) PRIMARY KEY,
        comment_post VARCHAR(500),
        id_user VARCHAR(255),
        id_post VARCHAR(255),
        FOREIGN KEY (id_user) REFERENCES user_labook (id),
        FOREIGN KEY (id_post) REFERENCES post_labook (id)
    );

SELECT * FROM user_labook;

SELECT * FROM post_labook;

SELECT * FROM friend_labook;