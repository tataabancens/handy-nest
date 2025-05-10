-- Insertar Roles
INSERT INTO role (name) VALUES
                            ('CLIENT'),
                            ('PROFESSIONAL'),
                            ('ADMIN')
    ON CONFLICT (name) DO NOTHING;

-- Insertar Usuarios (Clientes y Profesionales)
INSERT INTO "user" (name, last_name, email, phone, password, created_at) VALUES
                                                                             ('Juan', 'Pérez', 'juan@example.com', '+5491123456789', 'hashedpassword1', NOW()),
                                                                             ('María', 'Gómez', 'maria@example.com', '+5491123456790', 'hashedpassword2', NOW()),
                                                                             ('Carlos', 'López', 'carlos@example.com', '+5491123456791', 'hashedpassword3', NOW()),
                                                                             ('Ana', 'Martínez', 'ana@example.com', '+5491123456792', 'hashedpassword4', NOW()),
                                                                             ('Pedro', 'Fernández', 'pedro@example.com', '+5491123456793', 'hashedpassword5', NOW()),
                                                                             ('Sofía', 'Ramírez', 'sofia@example.com', '+5491123456794', 'hashedpassword6', NOW());

-- Insertar Relación Usuarios - Roles
INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id FROM "user" u, role r WHERE u.email = 'maria@example.com' AND r.name = 'PROFESSIONAL';

INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id FROM "user" u, role r WHERE u.email = 'carlos@example.com' AND r.name = 'PROFESSIONAL';

INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id FROM "user" u, role r WHERE u.email IN ('juan@example.com', 'ana@example.com', 'pedro@example.com', 'sofia@example.com') AND r.name = 'CLIENT';

-- Insertar Profesionales con Distintos Oficios
INSERT INTO professional (user_id, description, profile_image, is_verified, rating, location, latitude, longitude, service_radius, contact_whatsapp, contact_phone, contact_email, created_at)
SELECT u.id, 'Especialista en plomería', 'https://example.com/profile1.jpg', TRUE, 4.8, 'Buenos Aires', -34.6037, -58.3816, 15, '+5491123456790', '+5491123456790', 'maria@example.com', NOW()
FROM "user" u WHERE u.email = 'maria@example.com'
UNION ALL
SELECT u.id, 'Electricista con 10 años de experiencia', 'https://example.com/profile2.jpg', TRUE, 4.5, 'Córdoba', -31.4201, -64.1888, 20, '+5491123456791', '+5491123456791', 'carlos@example.com', NOW()
FROM "user" u WHERE u.email = 'carlos@example.com';

-- Insertar Categorías de Servicios
INSERT INTO category (name, description) VALUES
                                             ('Reparaciones', 'Servicios de reparación para el hogar'),
                                             ('Electricidad', 'Instalaciones y reparaciones eléctricas'),
                                             ('Plomería', 'Servicios de plomería'),
                                             ('Carpintería', 'Servicios de carpintería y muebles');

-- Insertar Servicios en Cada Categoría
INSERT INTO service (category_id, name, description)
SELECT id, 'Instalación de tuberías', 'Instalación y reparación de tuberías de agua' FROM category WHERE name = 'Plomería'
UNION ALL
SELECT id, 'Reparación de fugas', 'Detección y reparación de fugas de agua' FROM category WHERE name = 'Plomería'
UNION ALL
SELECT id, 'Instalación eléctrica', 'Instalación de sistemas eléctricos' FROM category WHERE name = 'Electricidad'
UNION ALL
SELECT id, 'Reparación de cortocircuitos', 'Solución de problemas eléctricos en el hogar' FROM category WHERE name = 'Electricidad'
UNION ALL
SELECT id, 'Armado de muebles', 'Armado de muebles en el hogar' FROM category WHERE name = 'Carpintería'
UNION ALL
SELECT id, 'Reparación de puertas', 'Reparación y mantenimiento de puertas de madera' FROM category WHERE name = 'Carpintería';

-- Asignar Servicios a Profesionales
INSERT INTO professional_service (professional_id, service_id)
SELECT p.id, s.id FROM professional p, service s
WHERE p.user_id = (SELECT id FROM "user" WHERE email = 'maria@example.com')
  AND s.name IN ('Instalación de tuberías', 'Reparación de fugas')
UNION ALL
SELECT p.id, s.id FROM professional p, service s
WHERE p.user_id = (SELECT id FROM "user" WHERE email = 'carlos@example.com')
  AND s.name IN ('Instalación eléctrica', 'Reparación de cortocircuitos');

-- Insertar Imágenes de Servicios para Profesionales
INSERT INTO professional_image (professional_id, url, created_at)
SELECT id, 'https://example.com/service1.jpg', NOW() FROM professional WHERE user_id = (SELECT id FROM "user" WHERE email = 'maria@example.com')
UNION ALL
SELECT id, 'https://example.com/service2.jpg', NOW() FROM professional WHERE user_id = (SELECT id FROM "user" WHERE email = 'carlos@example.com');

-- Insertar Reseñas de Clientes para Profesionales
INSERT INTO review (reviewer_id, professional_id, rating, comment, created_at)
SELECT u.id, p.id, 5, 'María hizo un excelente trabajo con la plomería.', NOW()
FROM "user" u, professional p
WHERE u.email = 'juan@example.com'
  AND p.user_id = (SELECT id FROM "user" WHERE email = 'maria@example.com')
UNION ALL
SELECT u.id, p.id, 4.5, 'Carlos arregló mi instalación eléctrica de manera eficiente.', NOW()
FROM "user" u, professional p
WHERE u.email = 'ana@example.com'
  AND p.user_id = (SELECT id FROM "user" WHERE email = 'carlos@example.com')
UNION ALL
SELECT u.id, p.id, 4.8, 'María es muy profesional y resolvió mi problema rápido.', NOW()
FROM "user" u, professional p
WHERE u.email = 'pedro@example.com'
  AND p.user_id = (SELECT id FROM "user" WHERE email = 'maria@example.com');


INSERT INTO public.professional_area (id, professional_id, area_id)
VALUES (DEFAULT, 1::integer, 5::integer);

INSERT INTO public.professional_area (id, professional_id, area_id)
VALUES (DEFAULT, 2::integer, 5::integer);

INSERT INTO public.professional_area (id, professional_id, area_id)
VALUES (DEFAULT, 1::integer, 1::integer);

INSERT INTO public.professional_area (id, professional_id, area_id)
VALUES (DEFAULT, 2::integer, 2::integer);