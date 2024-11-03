-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS airport_management_system;
USE airport_management_system;

-- Passenger table
CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL,
    UserType VARCHAR(10) DEFAULT "User"
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

-- Baggage table
CREATE TABLE Baggage (
    Type VARCHAR(50),
    FlightID INT,
    UserID INT,
    PRIMARY KEY (Type, FlightID, UserID),
    FOREIGN KEY (FlightID) REFERENCES Flight(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Passenger on Flight table
CREATE TABLE UserOnFlight (
    UserID INT,
    FlightID INT,
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

-- Aircraft flying Flight table
CREATE TABLE AircraftFlyingFlight (
    AircraftID INT,
    FlightID INT,
    Date DATE,
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

-- Add any additional indexes as needed for performance optimization
CREATE INDEX idx_flight_airline ON Flight(AirlineID);
CREATE INDEX idx_baggage_flight_user ON Baggage(FlightID, UserID);
CREATE INDEX idx_user_on_flight ON UserOnFlight(FlightID, UserID);
CREATE INDEX idx_aircraft_flying_flight ON AircraftFlyingFlight(FlightID, Date);
CREATE INDEX idx_transaction_user ON Transaction(UserID);
CREATE INDEX idx_transaction_store ON Transaction(StoreID);

for this database, generate dummy data. i want at least 10 tuples per table with you covering all the edge cases 