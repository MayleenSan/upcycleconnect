
INSERT INTO users (first_name, last_name, mail, password, phone, address, role, language, verified) VALUES
('Zakaria', 'Admin',   'admin@test.com',  '$2a$10$Hh1fV.mTOEKeKEfBX1jYJuxXAlxnxQ4t/Bhfld23KMBSjodjWnJku', '0600000000', 'Paris',      'admin',       'fr', true),
('Sophie',  'Bernard', 'sophie@test.com', '$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG', '0633333333', 'Lyon',       'salarie',     'fr', true),
('Marie',   'Dupont',  'marie@test.com',  '$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG', '0611111111', 'Bordeaux',   'particulier', 'fr', true),
('Paul',    'Martin',  'paul@test.com',   '$2a$10$/gDjiHuKRv6nQz7uH4iu4.vVyaztjY0nq9vs.sSlZ6ZlfRnIRkTAG', '0622222222', 'Marseille',  'particulier', 'fr', true)
ON CONFLICT (mail) DO NOTHING;

INSERT INTO categories (nom, description) VALUES
('Mobilier',           'Meubles et objets d''ameublement à retaper'),
('Textile',            'Tissus, vêtements et matières à recoudre'),
('Verre & Vaisselle',  'Bocaux, bouteilles, vaisselle réutilisable'),
('Bois & Matériaux',   'Palettes, planches, matériaux de récupération'),
('Métal',              'Objets métalliques à transformer'),
('Électroménager',     'Petit électroménager à réparer');

INSERT INTO prestation (nom, description, tarif, capacite_max, duree, statut, id_categories, id_users) VALUES
('Atelier réparation de meubles', 'Apprends à restaurer un meuble abîmé',       30, 10, 120, 'actif',   (SELECT id_categories FROM categories WHERE nom='Mobilier' LIMIT 1),          (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1)),
('Cours de couture zéro déchet',  'Transformer de vieux tissus en accessoires', 25, 8,  90,  'actif',   (SELECT id_categories FROM categories WHERE nom='Textile' LIMIT 1),           (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1)),
('Relooking de mobilier',         'Peinture et customisation de meubles',        50, 6,  180, 'actif',   (SELECT id_categories FROM categories WHERE nom='Mobilier' LIMIT 1),          (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1)),
('Collecte à domicile',           'On vient récupérer tes objets réemployables', 15, 0,  60,  'actif',   (SELECT id_categories FROM categories WHERE nom='Bois & Matériaux' LIMIT 1),  (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1)),
('Atelier soudure créative',      'Créer des objets déco à partir de métal',     40, 5,  150, 'inactif', (SELECT id_categories FROM categories WHERE nom='Métal' LIMIT 1),             (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1));

INSERT INTO evenement (nom, description, date_debut, date_fin, lieu, capacite_max, statut, id_users) VALUES
('Marché de l''upcycling',     'Vente et découverte d''objets réemployés',        '2026-08-15 10:00:00', '2026-08-15 18:00:00', 'Paris',     100, 'ouvert',  (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1)),
('Atelier collectif palettes', 'Fabrication de meubles en palettes en groupe',    '2026-08-22 14:00:00', '2026-08-22 17:00:00', 'Lyon',      20,  'ouvert',  (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1)),
('Collecte solidaire d''objets','Grande collecte d''objets pour le réemploi',     '2026-09-05 09:00:00', '2026-09-05 16:00:00', 'Marseille', 50,  'complet', (SELECT id_users FROM users WHERE mail='admin@test.com' LIMIT 1)),
('Repair Café mensuel',        'Répare tes objets avec l''aide de bénévoles',     '2026-09-12 15:00:00', '2026-09-12 19:00:00', 'Paris',     30,  'ouvert',  (SELECT id_users FROM users WHERE mail='sophie@test.com' LIMIT 1));

INSERT INTO annonce (titre, description, prix, etat, statut, id_categories, id_users) VALUES
('Palettes en bois (x5)',   'Palettes récupérées, idéales pour meubles ou jardinières', 0,  'usé', 'valide',     (SELECT id_categories FROM categories WHERE nom='Bois & Matériaux' LIMIT 1),  (SELECT id_users FROM users WHERE mail='marie@test.com' LIMIT 1)),
('Vieille chaise en bois',  'Chaise à restaurer, structure solide, assise à refaire',   8,  'usé', 'valide',     (SELECT id_categories FROM categories WHERE nom='Mobilier' LIMIT 1),          (SELECT id_users FROM users WHERE mail='paul@test.com' LIMIT 1)),
('Lot de bocaux en verre',  '12 bocaux propres, parfaits pour rangement ou déco',       5,  'bon', 'valide',     (SELECT id_categories FROM categories WHERE nom='Verre & Vaisselle' LIMIT 1), (SELECT id_users FROM users WHERE mail='marie@test.com' LIMIT 1)),
('Porte ancienne en chêne', 'Belle porte massive, à transformer en table',              25, 'bon', 'en_attente', (SELECT id_categories FROM categories WHERE nom='Bois & Matériaux' LIMIT 1),  (SELECT id_users FROM users WHERE mail='paul@test.com' LIMIT 1)),
('Chutes de tissu coton',   'Grand sac de chutes pour couture / patchwork',             3,  'bon', 'en_attente', (SELECT id_categories FROM categories WHERE nom='Textile' LIMIT 1),           (SELECT id_users FROM users WHERE mail='marie@test.com' LIMIT 1)),
('Vélo enfant rouillé',     'Cadre récupérable, roues à changer, pour pièces',          0,  'usé', 'en_attente', (SELECT id_categories FROM categories WHERE nom='Métal' LIMIT 1),             (SELECT id_users FROM users WHERE mail='paul@test.com' LIMIT 1)),
('Cagettes en bois (x8)',   'Cagettes de marché, top pour étagères murales',            6,  'bon', 'valide',     (SELECT id_categories FROM categories WHERE nom='Bois & Matériaux' LIMIT 1),  (SELECT id_users FROM users WHERE mail='marie@test.com' LIMIT 1)),
('Bidons métalliques 20L',  '3 bidons nettoyés, à transformer en pots de fleurs',       10, 'usé', 'refuse',     (SELECT id_categories FROM categories WHERE nom='Métal' LIMIT 1),             (SELECT id_users FROM users WHERE mail='paul@test.com' LIMIT 1)),
('Vieux cadres photo',      'Lot de 6 cadres dépareillés à repeindre',                  4,  'usé', 'en_attente', (SELECT id_categories FROM categories WHERE nom='Mobilier' LIMIT 1),          (SELECT id_users FROM users WHERE mail='marie@test.com' LIMIT 1)),
('Planches de coffrage',    'Bois brut récupéré de chantier, pour DIY',                 0,  'usé', 'valide',     (SELECT id_categories FROM categories WHERE nom='Bois & Matériaux' LIMIT 1),  (SELECT id_users FROM users WHERE mail='paul@test.com' LIMIT 1));
