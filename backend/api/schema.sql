CREATE TABLE IF NOT EXISTS users (
    id_users    SERIAL PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    mail        VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    phone       VARCHAR(20),
    address     TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    role        VARCHAR(50) NOT NULL DEFAULT 'particulier',
    language    VARCHAR(10) NOT NULL DEFAULT 'fr'
);

CREATE TABLE IF NOT EXISTS categories (
    id_categories SERIAL PRIMARY KEY,
    nom           VARCHAR(100) NOT NULL,
    description   TEXT
);

CREATE TABLE IF NOT EXISTS evenement (
    id_evenement  SERIAL PRIMARY KEY,
    nom           VARCHAR(255) NOT NULL,
    description   TEXT,
    date_debut    TIMESTAMP NOT NULL,
    date_fin      TIMESTAMP NOT NULL,
    lieu          VARCHAR(255),
    capacite_max  INT,
    statut        VARCHAR(50) DEFAULT 'ouvert',
    id_users      INT REFERENCES users(id_users) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS prestation (
    id_prestation  SERIAL PRIMARY KEY,
    nom            VARCHAR(255) NOT NULL,
    description    TEXT,
    tarif          DECIMAL(10,2),
    capacite_max   INT,
    duree          INT,
    date_creation  TIMESTAMP DEFAULT NOW(),
    statut         VARCHAR(50) DEFAULT 'actif',
    id_categories  INT REFERENCES categories(id_categories) ON DELETE SET NULL,
    id_users       INT REFERENCES users(id_users) ON DELETE SET NULL
);
