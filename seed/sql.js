export const dropAdminTable = 'DROP TABLE IF EXISTS Admins';

export const createAdminTable = `CREATE TABLE Admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    adminName VARCHAR(255) NOT NULL,
    admPassword VARCHAR(255) NOT NULL
);`;

export const insertIntoAdminTable = `INSERT INTO Admins (admin_id,adminName,admPassword)
VALUES
    (1, 'Darshan', '1255');`;

export const dropBooksTable = 'DROP TABLE IF EXISTS Books';

export const createBooksTable = `CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(10000), 
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    publisher VARCHAR(255),
    publish_date DATE,
    price DECIMAL(10, 2)
);`;

export const insertIntoBooksTable = `INSERT INTO Books (book_id, title, image, author, genre, publisher, publish_date, price)
VALUES
(1, 'The Great Gatsby', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/330px-The_Great_Gatsby_Cover_1925_Retouched.jpg', 'F. Scott Fitzgerald', 'Classic', 'Scribner', '1925-04-10', 12),
(2, 'To Kill a Mockingbird', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/330px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg','Harper Lee', 'Classic', 'J. B. Lippincott & Co.', '1960-07-11', 10),
(3, '1984', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/1984first.jpg/330px-1984first.jpg','George Orwell','Dystopian', 'Secker & Warburg', '1949-06-08', 8),
(4, 'Animal Farm', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Animal_Farm_-_1st_edition.jpg/330px-Animal_Farm_-_1st_edition.jpg', 'George Orwell', 'Allegory', 'Secker & Warburg', '1945-08-17', 7),
(5, 'Pride and Prejudice', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/330px-PrideAndPrejudiceTitlePage.jpg', 'Jane Austen', 'Romance', 'T. Egerton', '1813-01-28', 9),
(6, 'The Hobbit', 'https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg','J.R.R. Tolkien', 'Fantasy', 'Houghton Mifflin', '1937-09-21', 15),
(7, 'The Da Vinci Code', 'https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg','Dan Brown', 'Thriller', 'Doubleday', '2003-03-18', 13),
(8, 'Harry Potter and the Philosopher''s Stone', "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", 'J.K. Rowling', 'Fantasy', 'Bloomsbury', '1997-06-26', 9),
(9, 'The Hitchhiker''s Guide to the Galaxy', 'https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg', 'Douglas Adams', 'Science Fiction', 'Pan Books', '1979-10-12', 11),
(10, 'The Girl with the Dragon Tattoo', 'https://upload.wikimedia.org/wikipedia/en/b/bc/Thegirlwiththedragontattoo.jpg', 'Stieg Larsson', 'Mystery', 'Norstedts Förlag AB', '2005-08-01', 14),
(11, 'A Game of Thrones', 'https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg', 'George R.R. Martin', 'Fantasy', 'Bantam Books', '1996-08-01', 12),
(12, 'The Hunger Games', 'https://upload.wikimedia.org/wikipedia/en/d/dc/The_Hunger_Games.jpg', 'Suzanne Collins', 'Dystopian', 'Scholastic Press', '2008-09-14', 10),
(13, 'Animal Farm', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Animal_Farm_-_1st_edition.jpg/330px-Animal_Farm_-_1st_edition.jpg', 'George Orwell', 'Political Satire', 'Secker and Warburg', '1945-08-17', 8),
(14, 'The Lion, the Witch and the Wardrobe', 'https://upload.wikimedia.org/wikipedia/en/8/86/TheLionWitchWardrobe%281stEd%29.jpg', 'C.S. Lewis', 'Fantasy', 'Geoffrey Bles', '1950-01-01', 13),
(15, 'Eragon', 'https://upload.wikimedia.org/wikipedia/en/c/ce/Eragon_book_cover.png', 'Christopher Paolini', 'Fantasy', 'Knopf Books for Young Readers', '2002-01-01', 10);`;


export const dropCustomersTable = 'DROP TABLE IF EXISTS Customers';

export const createCustomersTable = `CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(20)
);`;

export const insertIntoCustomersTable = `INSERT INTO Customers (customer_id, name, email, password)
VALUES
    (1, 'John Smith', 'john.smith@example.com', '555-1234'),
    (2, 'Jane Doe', 'jane.doe@example.com', '555-5678'),
    (3, 'Bob Johnson', 'bob.johnson@example.com', '555-9012');`;

export const dropOrder_ItemsTable = 'DROP TABLE IF EXISTS Favs';

export const createOrder_ItemsTable = `CREATE TABLE Favs (
    customer_id INT NOT NULL,
    book_id INT NOT NULL,
    primary key(customer_id,book_id)
);`;
        
export const insertIntoOrder_ItemsTable = `INSERT INTO Favs (customer_id, book_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 5);`;