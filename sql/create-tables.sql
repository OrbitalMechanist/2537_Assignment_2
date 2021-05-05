create table member (
    ID int NOT NULL AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    vehicle varchar(50),
    verified char(1) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO member VALUE(0, 'Jacob', 'Seol', 'electricvehicles@gmail.com', 'Tesla Model X', 'Y');
INSERT INTO member VALUE(0, 'Elon', 'Musk', 'IAmRich@tesla.com', 'Kia EV6', 'Y');
INSERT INTO member VALUE(0, 'Jae', 'Hong', 'jae@gmail.com', 'Porsche Taycan', 'N');
INSERT INTO member VALUE(0, 'John', 'Collie', 'cdr@aln.al', 'M53 Great White', 'Y');
INSERT INTO member VALUE(0, 'LeBron', 'James', 'Basketball@basketball.com', 'Lamborghini Terzo Millenio', 'Y');
INSERT INTO member VALUE(0, 'LeBron', 'Queen', 'BasketballQueen@basketball.com', 'BMW i3', 'Y');
INSERT INTO member VALUE(0, 'LeBron', 'King', 'BasketballKing@basketball.com', 'Hyundai Kona EV', 'Y');
INSERT INTO member VALUE(0, 'Ace', 'Ventura', 'ILikeCheese@cheese.com', 'Tesla Model 3', 'Y');
INSERT INTO member VALUE(0, 'LeBlanc', 'Jordan', 'jokes@basketball.com', 'Kia Soul EV', 'Y');
INSERT INTO member VALUE(0, 'Maximus', 'Brown', 'partyevin@bcit.com', 'Tesla Roadster', 'N');