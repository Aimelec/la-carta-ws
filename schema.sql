DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tableId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    stateId INTEGER NOT NULL,
    information TEXT,
    FOREIGN KEY (tableId) REFERENCES tables(id),
    FOREIGN KEY (stateId) REFERENCES orderStates(id)
);

DROP TABLE IF EXISTS orderStates;
CREATE TABLE IF NOT EXISTS orderStates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    state VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO orderStates (state) VALUES 
('pending'), 
('accepted'), 
('rejected'), 
('inProgress'), 
('ready'), 
('finished');

DROP TABLE IF EXISTS tables;
CREATE TABLE IF NOT EXISTS tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurantId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    onlyPickup BOOLEAN NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
);

DROP TABLE IF EXISTS restaurants;
CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL CHECK (latitude BETWEEN -90 AND 90),
    longitude DECIMAL(9, 6) NOT NULL CHECK (longitude BETWEEN -180 AND 180),
    menuUrl VARCHAR(2083) NOT NULL,
    logoUrl VARCHAR(2083) NOT NULL,
    information TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
