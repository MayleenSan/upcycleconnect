DROP TABLE IF EXISTS annonce, prestation, evenement, categories, users CASCADE;

CREATE TABLE users (
    id_users            SERIAL PRIMARY KEY,
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    mail                VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    address             TEXT,
    created_at          TIMESTAMP DEFAULT NOW(),
    role                VARCHAR(50) NOT NULL DEFAULT 'particulier',
    language            VARCHAR(10) NOT NULL DEFAULT 'fr',
    verified            BOOLEAN NOT NULL DEFAULT true,
    verification_token  VARCHAR(255)
);

CREATE TABLE categories (
    id_categories SERIAL PRIMARY KEY,
    nom           VARCHAR(100) NOT NULL,
    description   TEXT
);

CREATE TABLE evenement (
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

CREATE TABLE prestation (
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

CREATE TABLE annonce (
    id_annonce     SERIAL PRIMARY KEY,
    titre          VARCHAR(255) NOT NULL,
    description    TEXT,
    prix           DECIMAL(10,2),
    etat           VARCHAR(50),
    statut         VARCHAR(50) DEFAULT 'en_attente',
    date_creation  TIMESTAMP DEFAULT NOW(),
    id_categories  INT REFERENCES categories(id_categories) ON DELETE SET NULL,
    id_users       INT REFERENCES users(id_users) ON DELETE SET NULL
);

INSERT INTO users (first_name, last_name, mail, password, phone, address, role, language, verified) VALUES
('Zakaria','Admin','admin@test.com','$2a$10$Hh1fV.mTOEKeKEfBX1jYJuxXAlxnxQ4t/Bhfld23KMBSjodjWnJku','0600000000','Paris','admin','fr',true),
('Sophie','Bernard','sophie@test.com','$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG','0633333333','Lyon','salarie','fr',true),
('Marie','Dupont','marie@test.com','$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG','0611111111','Bordeaux','particulier','fr',true),
('Paul','Martin','paul@test.com','$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG','0622222222','Marseille','particulier','fr',true);

INSERT INTO users (first_name, last_name, mail, password, phone, address, role, language, verified)
SELECT
  (ARRAY['Lucas','Emma','Hugo','Léa','Nathan','Chloé','Louis','Manon','Jules','Camille'])[1 + (i % 10)],
  (ARRAY['Petit','Durand','Leroy','Moreau','Simon','Laurent','Michel','Garcia','Roux','Fontaine'])[1 + (i % 10)],
  'user' || i || '@upcycle.demo',
  '$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG',
  '06' || lpad(i::text, 8, '0'),
  (ARRAY['Paris','Lyon','Marseille','Bordeaux','Lille','Nantes','Toulouse','Nice'])[1 + (i % 8)],
  (ARRAY['particulier','particulier','particulier','particulier','professionnel','salarie'])[1 + (i % 6)],
  'fr',
  true
FROM generate_series(1, 80) i;

INSERT INTO categories (nom, description) VALUES
('Mobilier','Meubles et objets d''ameublement à retaper'),
('Textile','Tissus, vêtements et matières à recoudre'),
('Verre & Vaisselle','Bocaux, bouteilles, vaisselle réutilisable'),
('Bois & Matériaux','Palettes, planches, matériaux de récupération'),
('Métal','Objets métalliques à transformer'),
('Électroménager','Petit électroménager à réparer'),
('Décoration','Objets déco à relooker'),
('Jardin','Matériel et objets d''extérieur'),
('Luminaire','Lampes et éclairages à restaurer'),
('Livres & Papeterie','Papier, livres, carton à réemployer');

INSERT INTO prestation (nom, description, tarif, capacite_max, duree, statut, id_categories, id_users)
SELECT
  (ARRAY['Atelier réparation','Cours de relooking','Formation couture','Collecte à domicile','Atelier soudure','Stage menuiserie','Initiation upcycling'])[1 + (i % 7)] || ' #' || i,
  'Prestation animée par un salarié, ouverte à tous les niveaux.',
  (10 + (i % 9) * 5),
  (5 + (i % 15)),
  (30 + (i % 6) * 30),
  (ARRAY['actif','actif','actif','inactif'])[1 + (i % 4)],
  c.cat,
  u.usr
FROM generate_series(1, 40) i
CROSS JOIN LATERAL (SELECT id_categories AS cat FROM categories ORDER BY random() LIMIT 1) c
CROSS JOIN LATERAL (SELECT id_users AS usr FROM users WHERE role IN ('salarie','admin') ORDER BY random() LIMIT 1) u;

INSERT INTO evenement (nom, description, date_debut, date_fin, lieu, capacite_max, statut, id_users)
SELECT
  (ARRAY['Marché upcycling','Repair Café','Collecte solidaire','Atelier collectif','Bourse aux objets'])[1 + (i % 5)] || ' #' || i,
  'Événement de sensibilisation au réemploi.',
  NOW() + (i || ' days')::interval,
  NOW() + (i || ' days')::interval + interval '4 hours',
  (ARRAY['Paris','Lyon','Marseille','Bordeaux','Lille'])[1 + (i % 5)],
  (20 + (i % 8) * 10),
  (ARRAY['ouvert','ouvert','complet'])[1 + (i % 3)],
  u.usr
FROM generate_series(1, 20) i
CROSS JOIN LATERAL (SELECT id_users AS usr FROM users WHERE role IN ('salarie','admin') ORDER BY random() LIMIT 1) u;

INSERT INTO annonce (titre, description, prix, etat, statut, id_categories, id_users)
SELECT
  (ARRAY['Chaise','Table','Armoire','Vélo','Lampe','Étagère','Commode','Bureau','Tabouret','Miroir','Cadre','Vase','Fauteuil','Buffet','Tapis'])[1 + (i % 15)]
    || ' ' || (ARRAY['vintage','en bois','en métal','à restaurer','récupéré','ancien'])[1 + (i % 6)] || ' #' || i,
  'Objet à réemployer, à venir chercher sur place.',
  (i % 60),
  (ARRAY['neuf','bon','usé'])[1 + (i % 3)],
  (ARRAY['en_attente','valide','valide','refuse'])[1 + (i % 4)],
  c.cat,
  u.usr
FROM generate_series(1, 200) i
CROSS JOIN LATERAL (SELECT id_categories AS cat FROM categories ORDER BY random() LIMIT 1) c
CROSS JOIN LATERAL (SELECT id_users AS usr FROM users WHERE role='particulier' ORDER BY random() LIMIT 1) u;
