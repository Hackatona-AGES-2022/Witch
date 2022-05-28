CREATE TABLE `post_category` (
    `id_post_category` int PRIMARY KEY AUTO_INCREMENT,
    `id_post` int not null,
    `id_category` int not null
);

CREATE TABLE `post` (
    `id_post` int PRIMARY KEY AUTO_INCREMENT,
    `id_user` int not null,
    `content` varchar(255) not null,
    `title` varchar(255),
    `trigger_warning` varchar(255),
    `date` timestamp default now()
);

CREATE TABLE `comments` (
    `id_comment` int PRIMARY KEY AUTO_INCREMENT,
    `id_post` int not null,
    `id_user` int not null,
    `content` varchar(255)
);

CREATE TABLE `support` (
    `id_support` int PRIMARY KEY AUTO_INCREMENT,
    `id_post` int not null,
    `id_user` int not null
);

CREATE TABLE `saved_posts` (
    `id_saved_post` int PRIMARY KEY AUTO_INCREMENT,
    `id_post` int not null,
    `id_user` int not null
);

ALTER TABLE
    `post`
ADD
    FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE
    `categories`
ADD
    FOREIGN KEY (`id_super_category`) REFERENCES `categories` (`id_category`);

ALTER TABLE
    `post_category`
ADD
    FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`);

ALTER TABLE
    `post_category`
ADD
    FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`);

ALTER TABLE
    `comments`
ADD
    FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`);

ALTER TABLE
    `comments`
ADD
    FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE
    `support`
ADD
    FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE
    `support`
ADD
    FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`);

ALTER TABLE
    `saved_posts`
ADD
    FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`);

ALTER TABLE
    `saved_posts`
ADD
    FOREIGN KEY (`id_user`) REFERENCES `post` (`id_user`);