CREATE TABLE user (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    password
);

CREATE TABLE favorites (
    favs_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    move VARCHAR(25) DEFAULT NULL,
    success_mod INT DEFAULT 0,
    dmg VARCHAR(25) DEFAULT NULL,
    dmg_mod INT DEFAULT 0,
    FOREIGN KEY (char_id) REFERENCES character(char_id)
);

CREATE TABLE notes (
    notes_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    note TEXT DEFAULT NULL,
    FOREIGN KEY (session_id) REFERENCES session
);

CREATE TABLE character (
    char_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    mod1 INT DEFAULT 0,
    mod2 INT DEFAULT 0,
    mod3 INT DEFAULT 0,
    mod4 INT DEFAULT 0,
    mod5 INT DEFAULT 0,
    mod6 INT DEFAULT 0,
    armor_class INT DEFAULT 10,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (favs_id) REFERENCES favorites(favs_id)
    FOREIGN KEY (notes_id) REFERENCES notes(notes_id)
);

CREATE TABLE session (
    session_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP NOT NULL,
    chat_log TEXT DEFAULT NULL
)