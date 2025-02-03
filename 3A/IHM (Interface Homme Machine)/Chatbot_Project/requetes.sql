CREATE DATABASE STOCK_Magazin;

USE STOCK_Magazin;
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE types_vetements (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tailles (
    id SERIAL PRIMARY KEY,
    taille VARCHAR(5) NOT NULL UNIQUE
);

CREATE TABLE stock (
    id SERIAL PRIMARY KEY,
    type_vetement_id INT NOT NULL,
    taille_id INT NOT NULL,
    couleur VARCHAR(50) NOT NULL,
    quantite INT NOT NULL CHECK (quantite >= 0),
    FOREIGN KEY (type_vetement_id) REFERENCES types_vetements(id),
    FOREIGN KEY (taille_id) REFERENCES tailles(id),
    UNIQUE (type_vetement_id, taille_id, couleur) -- Unicité des combinaisons
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE commandes (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    categorie_id INT NOT NULL,
    type_vetement_id INT NOT NULL,
    taille_id INT NOT NULL,
    couleur VARCHAR(50) NOT NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (categorie_id) REFERENCES categories(id),
    FOREIGN KEY (type_vetement_id) REFERENCES types_vetements(id),
    FOREIGN KEY (taille_id) REFERENCES tailles(id)
);


--Insertion des données initiales
INSERT INTO categories (nom) VALUES
('Homme'),
('Femme'),
('Enfant');
INSERT INTO types_vetements (nom) VALUES
('Pantalon'),
('Manteau'),
('T-Shirt'),
('Pull'),
('Chemise'),
('Veste'),
('Jupe'),
('Robe'),
('Short'),
('Chaussettes'),
('Sac'),
('Ceinture'),
('Cravate'),
('Costume'),
('Blouson'),
('Chaussures'),
('Casquette');
INSERT INTO tailles (taille) VALUES
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL');

--exemple d'insertion
INSERT INTO stock (type_vetement_id, taille_id, couleur, quantite) VALUES
((SELECT id FROM types_vetements WHERE nom = 'Pantalon'), (SELECT id FROM tailles WHERE taille = 'S'), 'Noir', 10),
((SELECT id FROM types_vetements WHERE nom = 'Manteau'), (SELECT id FROM tailles WHERE taille = 'M'), 'Bleu', 5),
((SELECT id FROM types_vetements WHERE nom = 'T-Shirt'), (SELECT id FROM tailles WHERE taille = 'L'), 'Blanc', 20);

-- Insertion de clients
INSERT INTO clients (nom, adresse, email) VALUES
('Dupont', '1 rue de la Paix, 75000 Paris', 'dupont@example.com'),
('Martin', '10 avenue des Champs, 75008 Paris', 'martin@example.com');

-- Exemple d'insertion de commandes
INSERT INTO commandes (client_id, categorie_id, type_vetement_id, taille_id, couleur, quantite) VALUES
((SELECT id FROM clients WHERE email = 'dupont@example.com'), 
 (SELECT id FROM categories WHERE nom = 'Homme'),
 (SELECT id FROM types_vetements WHERE nom = 'Pantalon'),
 (SELECT id FROM tailles WHERE taille = 'S'),
 'Noir', 2),

((SELECT id FROM clients WHERE email = 'martin@example.com'), 
 (SELECT id FROM categories WHERE nom = 'Femme'),
 (SELECT id FROM types_vetements WHERE nom = 'Robe'),
 (SELECT id FROM tailles WHERE taille = 'M'),
 'Rouge', 1);