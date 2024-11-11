DROP DATABASE IF EXISTS airport_management_system;
CREATE DATABASE IF NOT EXISTS airport_management_system;
USE airport_management_system;

CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserType ENUM("Admin","User","Airline","Store") DEFAULT "User"
);

CREATE TABLE Airline (
    AirlineID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Flight (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Destination VARCHAR(100) NOT NULL,
    Origin VARCHAR(100) NOT NULL,
    AirlineID INT,
    FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID)
);

CREATE TABLE UserOnFlight (
    UserID INT,
    FlightID INT,
    NoOfCheckIn INT DEFAULT 0,
    NoOfCabin INT DEFAULT 0,
    PRIMARY KEY (UserID, FlightID),
    FOREIGN KEY (UserID) REFERENCES User(ID),
    FOREIGN KEY (FlightID) REFERENCES Flight(ID)
);

CREATE TABLE Aircraft (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    TailNumber VARCHAR(20) UNIQUE NOT NULL,
    DateOfLastMaintenance DATE,
    Model VARCHAR(50) NOT NULL
);

CREATE TABLE AircraftFlyingFlight (
    AircraftID INT,
    FlightID INT,
    Date DATE,
    ArrivalTime TIME,
    DepartureTime TIME,
    Gate VARCHAR(10),
    Belt VARCHAR(10),
    Status ENUM("On time", "Delayed", "Cancelled"),
    PRIMARY KEY (AircraftID, FlightID, Date),
    FOREIGN KEY (AircraftID) REFERENCES Aircraft(ID),
    FOREIGN KEY (FlightID) REFERENCES Flight(ID)
);


CREATE TABLE Stores (
    StoreID INT PRIMARY KEY,
    Floor INT NOT NULL,
    Building VARCHAR(50) NOT NULL
);

CREATE TABLE Item (
    Name VARCHAR(100) PRIMARY KEY,
    Type ENUM('Food', 'Souvenir', 'Clothing', 'Electronics', 'Other') NOT NULL
);

CREATE TABLE StallSellsItems (
    StoreID INT,
    ItemName VARCHAR(100),
    PricePerUnit DECIMAL(10, 2) NOT NULL,
    TotalQuantity INT NOT NULL,
    PRIMARY KEY (StoreID, ItemName),
    FOREIGN KEY (StoreID) REFERENCES Stores(StoreID),
    FOREIGN KEY (ItemName) REFERENCES Item(Name)
);

CREATE TABLE Transaction (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    Qty INT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    Item_name VARCHAR(100) NOT NULL,
    UserID INT,
    StoreID INT,
    FOREIGN KEY (Item_name) REFERENCES Item(Name),
    FOREIGN KEY (UserID) REFERENCES User(ID),
    FOREIGN KEY (StoreID) REFERENCES Stores(StoreID)
);

CREATE TABLE RefreshTokens (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Token VARCHAR(255) NOT NULL,
    SessionID VARCHAR(255) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

CREATE INDEX idx_refresh_token ON RefreshTokens(Token);
CREATE INDEX idx_flight_airline ON Flight(AirlineID);
CREATE INDEX idx_user_on_flight ON UserOnFlight(FlightID, UserID);
CREATE INDEX idx_aircraft_flying_flight ON AircraftFlyingFlight(FlightID, Date);
CREATE INDEX idx_transaction_user ON Transaction(UserID);
CREATE INDEX idx_transaction_store ON Transaction(StoreID);


DELIMITER //

CREATE TRIGGER usertype_check
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    IF NEW.Username LIKE 'admin%' THEN
        IF NEW.UserType != 'admin' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid user type';
        END IF;
    END IF;
    
    IF NEW.Username LIKE 'airline%' THEN
        IF NEW.UserType != 'airline' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid user type';
        END IF;
    END IF;

    IF NEW.Username LIKE 'store%' THEN
        IF NEW.UserType != 'store' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid user type';
        END IF;
    END IF;

    IF NEW.UserType = 'User' THEN
        IF NEW.Username LIKE 'admin%' OR NEW.Username LIKE 'store%' OR NEW.Username LIKE 'airline%' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid user type';
        END IF;
    END IF;
END;

//

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE InsertUser(
    IN p_UserName VARCHAR(100),
    IN p_UserType VARCHAR(50)
)
BEGIN
    -- Insert the user into the User table
    INSERT INTO User (UserName, UserType)
    VALUES (p_UserName, p_UserType);

    -- Check if the inserted user is a store
    IF p_UserType = 'Store' THEN
        -- Get the last inserted UserID (this assumes auto-increment is used)
        SET @lastUserID = LAST_INSERT_ID();
        
        -- Insert the UserID into the Stores table as StoreID
        INSERT INTO Stores (StoreID)
        VALUES (@lastUserID);
    END IF;
END $$

DELIMITER ;


INSERT INTO user (ID, Name, Username, Password, UserType) VALUES
    (1, 'admin', 'admin', '$2a$10$5NGE5cGIFAJbPU6FcYvMm.sTkpvVJhY9n56zNRqEpmAVxDM5kte/a', 'Admin'),
    (2, 'user', 'user', '$2a$10$uiSaHHXxw.0sJG/.B3N5Xui3TQd24dWfzcoXItgDW.5e3YLB8ddOq', 'User'),
    (3, 'airline', 'airline', '$2a$10$Ws.JorP51pbZ5tREEmZPFOdeKmpfGPnw5xAdoGHXK1TeU9JWBY4v2', 'Airline'),
    (4, 'store', 'store', '$2a$10$KUYgMmd6kgfPJnbv9FXwouHkJzITJJIE6zsuchHDBgC2b0PPA0WDS', 'Store');

INSERT INTO Airline (Name) VALUES 
    ('Delta Airlines'),
    ('American Airlines'),
    ('United Airlines'),
    ('Southwest Airlines'),
    ('JetBlue Airways'),
    ('Alaska Airlines'),
    ('Spirit Airlines'),
    ('Frontier Airlines');

INSERT INTO Aircraft (TailNumber, DateOfLastMaintenance, Model) VALUES 
    ('N12345', '2023-10-01', 'Boeing 737'),
    ('N67890', '2023-09-15', 'Airbus A320'),
    ('N54321', '2023-08-30', 'Boeing 777'),
    ('N09876', '2023-07-20', 'Airbus A380'),
    ('N11223', '2023-06-10', 'Embraer 175');

INSERT INTO Flight (Destination, Origin, AirlineID) VALUES 
    ('New York (JFK)', 'Los Angeles (LAX)', 1),
    ('Miami (MIA)', 'New York (JFK)', 2),
    ('New York (JFK)', 'Seattle (SEA)', 3),
    ('Boston (BOS)', 'New York (JFK)', 4),
    ('New York (JFK)', 'San Francisco (SFO)', 5);

INSERT INTO UserOnFlight (UserID, FlightID, NoOfCheckIn, NoOfCabin) VALUES 
    (1, 2, 2, 1),
    (2, 3, 1, 2),
    (3, 4, 1, 1),
    (4, 3, 2, 2);

INSERT INTO AircraftFlyingFlight (AircraftID, FlightID, Date, ArrivalTime, DepartureTime, Status, Gate, Belt) VALUES 
    (1, 4, '2023-12-02', '12:30:00', '09:15:00', 'On time', 'A1', 'B1'),
    (2, 5, '2023-12-03', '14:45:00', '11:10:00', 'Delayed', 'B2', 'B2'),
    (3, 1, '2023-12-04', '16:20:00', '13:05:00', 'On time', 'C3', 'B3'),
    (4, 2, '2023-12-03', '18:55:00', '15:30:00', 'Cancelled', 'D4', 'B4'),
    (5, 3, '2023-12-03', '20:40:00', '17:20:00', 'On time', 'E5', 'B5');

INSERT INTO Stores (Floor, Building) VALUES 
    (1, 'Main Terminal'),
    (2, 'International Terminal'),
    (3, 'Domestic Terminal'),
    (1, 'Concourse A'),
    (2, 'Concourse B');

INSERT INTO Item (Name, Type) VALUES 
    ('Burger', 'Food'),
    ('Keychain', 'Souvenir'),
    ('T-shirt', 'Clothing'),
    ('Headphones', 'Electronics'),
    ('Water Bottle', 'Other');

INSERT INTO StallSellsItems (StoreID, ItemName, PricePerUnit, TotalQuantity) VALUES 
    (1, 'Burger', 5.99, 100),
    (2, 'Keychain', 2.99, 200),
    (3, 'T-shirt', 15.99, 150),
    (4, 'Headphones', 29.99, 50),
    (5, 'Water Bottle', 3.99, 300);

INSERT INTO Transaction (Qty, Item_name, UserID, StoreID) VALUES 
    (2, 'Burger', 1, 1),
    (1, 'Keychain', 2, 2),
    (3, 'T-shirt', 3, 3),
    (1, 'Headphones', 4, 4),
    (4, 'Water Bottle', 1, 5);