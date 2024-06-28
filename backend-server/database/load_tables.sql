Use zeroer;


-- Create users table
DROP TABLE IF EXISTS user_relationship CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    user_name TEXT NOT NULL,
    user_address TEXT NOT NULL,
    user_city TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    process_status TEXT NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE user_relationship (
	id INT NOT NULL,
    relationship TEXT NOT NULL,
	PRIMARY KEY (id),
    foreign key (id) references users(id)
);

