DROP TABLE IF EXISTS restaurants;
CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL CHECK (latitude BETWEEN -90 AND 90),
    longitude DECIMAL(9, 6) NOT NULL CHECK (longitude BETWEEN -180 AND 180),
    menu_url VARCHAR(2083) NOT NULL,
    logo_url VARCHAR(2083) NOT NULL,
    information TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS tables;
CREATE TABLE IF NOT EXISTS tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INTEGER NOT NULL,
    number INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    only_pickup BOOLEAN NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    UNIQUE (restaurant_id, number)
);

DROP TABLE IF EXISTS order_states;
CREATE TABLE IF NOT EXISTS order_states (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    state VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO order_states (state) VALUES 
('pending'), 
('accepted'), 
('rejected'), 
('in_progress'), 
('ready'), 
('finished');

DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    state_id INTEGER NOT NULL,
    information TEXT,
    device_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (table_id) REFERENCES tables(id),
    FOREIGN KEY (state_id) REFERENCES order_states(id)
);