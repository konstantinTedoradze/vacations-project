CREATE DATABASE myvacations;

use myvacations;

create table users(
id int auto_increment,
username varchar(255) not null,
password varchar(255) not null,
first_name varchar(255) not null,
last_name varchar(255) not null,
user_type varchar(255) not null default "CUSTOMER",
primary key(id)
);

create table vacations(
id int auto_increment,
description varchar(255) not null,
destination varchar(255) not null,
picture varchar(255) not null,
from_date Date,
to_date Date,
price int not null,
followers int not null default 0,
status bool default false,
primary key(id)
);

create table followed_vacations(
id int auto_increment,
user_id int not null,
vacation_id int not null,
status bool default true,
primary key(id),
CONSTRAINT UC_ID UNIQUE (user_id,vacation_id)
);

INSERT INTO users (username, password, first_name, last_name, user_type)
VALUES ('kosta', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMyIsInVzZXJfdHlwZSI6IkFETUlOIiwidXNlcm5hbWUiOiJrb3N0YSJ9.of_2aVR4Nbjg9FVUvOubyBSVoG01DwH4r3X-KInG5qM',
'konstantin', 'tedoradze', 'ADMIN');

INSERT INTO users (id, username, password, first_name, last_name, user_type)
VALUES ('john', 'asfas','john', 'doe', 'CUSTOMER');

INSERT INTO vacations (description, destination, picture, from_date, to_date, price, followers)
VALUES ("London, city, capital of the United Kingdom. By far Britain's largest metropolis, it is also the country's economic, transportation, and cultural centre", "London, Great Britain", "london.jpg", "20/09/21", "25/09/21",2500,0),
("Athens, historic city and capital of Greece. Many of Classical civilization's intellectual and artistic ideas originated there, and the city is generally considered to be the birthplace of Western civilization.", "Athens, Greece ", "athen.jpg", "09/09/21", "14/09/21", 2000,0),
("Budapest is the capital and the most populous city of Hungary, and the ninth-largest city in the European Union by population within city limits.
","Budapest,hungary","budapest.jpg","12/10/21","18/10/21", 1800, 0),
("San Francisco,It is a cultural and financial centre of the western United States and one of the country’s most cosmopolitan cities.","San francisco California, USA","San-Francisco.jpg","25/10/21","30/10/21",5000,0),
("Tokyo is the capital and most populous prefecture of Japan. Located at the head of Tokyo Bay, the prefecture forms part of the Kantō region on the central Pacific coast of Japan's main island of Honshu","Tokyo, Japan","tokyo.jpg","10/09/21", "14/09/21", 3000, 0),
("Rome, Italian Roma, historic city and capital of Roma provincia (province), of Lazio regione (region), and of the country of Italy.", "Rome, Italy", 
"rome.jpg", "14/09/21", "19/09/21", 2000, 0);