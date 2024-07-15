CREATE TABLE disciplines(
	name varchar(64) PRIMARY KEY
);

CREATE TABLE countries(
	name varchar(32) PRIMARY KEY
);

INSERT INTO disciplines (name)
VALUES ('100m run'),
('long jump'),
('short put'),
('high jump'),
('400m run'),
('110m hurdles'),
('discus'),
('pole vault'),
('javelin'),
('1500m run');

INSERT INTO countries (name)
VALUES ('USA'),
('Canada'),
('Portugal'),
('Spain'),
('France'),
('Germany'),
('GB'),
('Netherlands'),
('Denmark'),
('Norway'),
('Sweden'),
('Finland'),
('Estonia'),
('Latvia'),
('Lithuania'),
('Russia'),
('Belarus'),
('Poland');