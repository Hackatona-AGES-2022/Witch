CREATE TABLE users (
    id_user int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    date_birth date,
    id_facebook varchar(255),
    id_google varchar(255),
    created_at timestamp default now()
);

CREATE TABLE addresses (
    id_address int PRIMARY KEY AUTO_INCREMENT,
    state varchar(2) NOT NULL,
    cep varchar(255) NOT NULL,
    street varchar(255) NOT NULL,
    number int NOT NULL,
    description varchar(255),
    latitude varchar(255) NOT NULL,
    longitude varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    id_user int NULL,
    created_at timestamp default now()
);

CREATE TABLE categories (
    id_category int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    id_super_category int,
    created_at timestamp default now()
);

ALTER TABLE
    categories
ADD
    FOREIGN KEY (id_super_category) REFERENCES categories (id_category);