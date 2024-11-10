-- Create the database (if it doesn't exist)
DROP DATABASE IF EXISTS airport_management_system;
CREATE DATABASE IF NOT EXISTS airport_management_system;
USE airport_management_system;

-- Passenger table
CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserType ENUM("Admin","User","Airline","Store") DEFAULT "User"
);

-- Airline table
CREATE TABLE Airline (
    AirlineID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE
);

-- Flight table
CREATE TABLE Flight (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Gate VARCHAR(10),
    Belt VARCHAR(10),
    Destination VARCHAR(100) NOT NULL,
    Origin VARCHAR(100) NOT NULL,
    AirlineID INT,
    FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID)
);

-- Passenger on Flight table
CREATE TABLE UserOnFlight (
    UserID INT,
    FlightID INT,
    NoOfCheckIn INT DEFAULT 0,
    NoOfCabin INT DEFAULT 0,
    PRIMARY KEY (UserID, FlightID),
    FOREIGN KEY (UserID) REFERENCES User(ID),
    FOREIGN KEY (FlightID) REFERENCES Flight(ID)
);

-- Aircraft table
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
    Status ENUM("On time", "Delayed", "Cancelled")
    PRIMARY KEY (AircraftID, FlightID, Date),
    FOREIGN KEY (AircraftID) REFERENCES Aircraft(ID),
    FOREIGN KEY (FlightID) REFERENCES Flight(ID)
);


-- Stores table
CREATE TABLE Stores (
    StoreID INT AUTO_INCREMENT PRIMARY KEY,
    Floor INT NOT NULL,
    Building VARCHAR(50) NOT NULL
);

-- Item table
CREATE TABLE Item (
    Name VARCHAR(100) PRIMARY KEY,
    Type ENUM('Food', 'Souvenir', 'Clothing', 'Electronics', 'Other') NOT NULL
);

-- Stall sells items table
CREATE TABLE StallSellsItems (
    StoreID INT,
    ItemName VARCHAR(100),
    PricePerUnit DECIMAL(10, 2) NOT NULL,
    TotalQuantity INT NOT NULL,
    PRIMARY KEY (StoreID, ItemName),
    FOREIGN KEY (StoreID) REFERENCES Stores(StoreID),
    FOREIGN KEY (ItemName) REFERENCES Item(Name)
);

-- Transaction table
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

-- Refresh Tokens table
CREATE TABLE RefreshTokens (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Token VARCHAR(255) NOT NULL,
    SessionID VARCHAR(255) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Index for faster token lookups
CREATE INDEX idx_refresh_token ON RefreshTokens(Token);
CREATE INDEX idx_flight_airline ON Flight(AirlineID);
CREATE INDEX idx_user_on_flight ON UserOnFlight(FlightID, UserID);
CREATE INDEX idx_aircraft_flying_flight ON AircraftFlyingFlight(FlightID, Date);
CREATE INDEX idx_transaction_user ON Transaction(UserID);
CREATE INDEX idx_transaction_store ON Transaction(StoreID);


--Triggers
DELIMITER //

CREATE TRIGGER usertype_check
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    -- Check for "admin" prefix
    IF NEW.username LIKE 'admin%' THEN
        IF NEW.usertype != 'admin' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid login type';
        END IF;
    END IF;
    
    -- Check for "airline" prefix
    IF NEW.username LIKE 'airline%' THEN
        IF NEW.usertype != 'airline' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid login type';
        END IF;
    END IF;

    -- Check for "store" prefix
    IF NEW.username LIKE 'store%' THEN
        IF NEW.usertype != 'store' THEN
            SIGNAL SQLSTATE '42000'
            SET MESSAGE_TEXT = 'Invalid login type';
        END IF;
    END IF;
END;
//

DELIMITER ;

-- Airline Table
INSERT INTO Airline (Name) VALUES 
    ('Delta Airlines'),
    ('American Airlines'),
    ('United Airlines'),
    ('Southwest Airlines'),
    ('JetBlue Airways'),
    ('Alaska Airlines'),
    ('Spirit Airlines'),
    ('Frontier Airlines');

-- Aircraft Table
INSERT INTO Aircraft (TailNumber, DateOfLastMaintenance, Model) VALUES 
    ('N12345', '2023-10-01', 'Boeing 737'),
    ('N67890', '2023-09-15', 'Airbus A320'),
    ('N54321', '2023-08-30', 'Boeing 777'),
    ('N09876', '2023-07-20', 'Airbus A380'),
    ('N11223', '2023-06-10', 'Embraer 175');

-- Flight Table
INSERT INTO Flight (Gate, Belt, Destination, Origin, AirlineID) VALUES 
    ('A1', 'B1', 'New York (JFK)', 'Los Angeles (LAX)', 1),
    ('B2', 'B2', 'Chicago (ORD)', 'Miami (MIA)', 2),
    ('C3', 'B3', 'Dallas (DFW)', 'Seattle (SEA)', 3),
    ('D4', 'B4', 'Boston (BOS)', 'Denver (DEN)', 4),
    ('E5', 'B5', 'Atlanta (ATL)', 'San Francisco (SFO)', 5);

-- UserOnFlight Table
INSERT INTO UserOnFlight (UserID, FlightID, NoOfCheckIn, NoOfCabin) VALUES 
    (1, 6, 2, 1),
    (2, 7, 1, 2),
    (3, 8, 1, 1),
    (4, 9, 2, 2);

-- AircraftFlyingFlight Table
INSERT INTO AircraftFlyingFlight (AircraftID, FlightID, Date, ArrivalTime, DepartureTime, Status) VALUES 
    (1, 6, '2023-12-02', '12:30:00', '09:15:00', 'On time'),
    (2, 7, '2023-12-03', '14:45:00', '11:10:00', 'Delayed'),
    (3, 8, '2023-12-04', '16:20:00', '13:05:00', 'On time'),
    (4, 9, '2023-12-05', '18:55:00', '15:30:00', 'Cancelled'),
    (5, 10, '2023-12-06', '20:40:00', '17:20:00', 'On time');

-- Stores Table
INSERT INTO Stores (Floor, Building) VALUES 
    (1, 'Main Terminal'),
    (2, 'International Terminal'),
    (3, 'Domestic Terminal'),
    (1, 'Concourse A'),
    (2, 'Concourse B');

-- Item Table
INSERT INTO Item (Name, Type) VALUES 
    ('Burger', 'Food'),
    ('Keychain', 'Souvenir'),
    ('T-shirt', 'Clothing'),
    ('Headphones', 'Electronics'),
    ('Water Bottle', 'Other');

-- StallSellsItems Table
INSERT INTO StallSellsItems (StoreID, ItemName, PricePerUnit, TotalQuantity) VALUES 
    (1, 'Burger', 5.99, 100),
    (2, 'Keychain', 2.99, 200),
    (3, 'T-shirt', 15.99, 150),
    (4, 'Headphones', 29.99, 50),
    (5, 'Water Bottle', 3.99, 300);

-- Transaction Table
INSERT INTO Transaction (Qty, Item_name, UserID, StoreID) VALUES 
    (2, 'Burger', 1, 1),
    (1, 'Keychain', 2, 2),
    (3, 'T-shirt', 3, 3),
    (1, 'Headphones', 4, 4),
    (4, 'Water Bottle', 1, 5);