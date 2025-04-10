-- CATEGORY
INSERT INTO category (id, name) VALUES
(1, 'Top'),
(2, 'Bottom'),
(3, 'Shoes'),
(4, 'Outerwear'),
(5, 'One piece'),
(6, 'Bag'),
(7, 'Accessory'),
(8, 'Jewelry'),
(9, 'Swimwear');

-- SUBCATEGORY
INSERT INTO subcategory (id, name, category_id) VALUES
(1, 'T-Shirts', 1),
(2, 'Blouses', 1),
(3, 'Jeans', 2),
(4, 'Sneakers', 3),
(5, 'Jackets', 4);

-- COLOR
INSERT INTO color (id, name) VALUES
(1, 'Red'),
(2, 'Blue'),
(3, 'Black'),
(4, 'White'),
(5, 'Green');

-- TAGS
INSERT INTO tags (id, name) VALUES
(1, 'Casual'),
(2, 'Formal'),
(3, 'Sporty'),
(4, 'Winter'),
(5, 'Trendy');

-- CLOTHING ITEMS
INSERT INTO clothing_item (
    id, name, material, size, brand, gift, price, no_of_wears, date_acquired, season, imageurl, user_id, category_id, subcategory_id
) VALUES
(1, 'Red T-Shirt', 'Cotton', 'M', 'Zara', false, 19.99, 10, '2024-06-01', 'Summer', '/images/outfit1.jpg', 1, 1, 1),
(2, 'Blue Jeans', 'Denim', 'S', 'Levi\'s', true, 49.99, 5, '2023-09-15', 'All', '/images/outfit1.jpg', 1, 2, 3),
(3, 'Black Sneakers', 'Leather', '42', 'Nike', false, 89.99, 12, '2022-10-10', 'All', '/images/outfit2.jpg', 2, 3, 4),
(4, 'White Blouse', 'Silk', 'M', 'H&M', false, 39.99, 3, '2024-01-20', 'Spring', '/images/outfit2.jpg', 3, 1, 2),
(5, 'Green Jacket', 'Polyester', 'L', 'Adidas', false, 119.99, 7, '2023-12-05', 'Winter', '/images/outfit3.jpg', 3, 4, 5);

-- CLOTHING ITEM COLORS
INSERT INTO clothing_item_colors (clothing_item_id, color_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5);

-- OUTFITS
INSERT INTO outfit (id, imageurl, user_id) VALUES
(1, '/images/outfit1.jpg', 1),
(2, '/images/outfit2.jpg', 2),
(3, '/images/outfit3.jpg', 3);

-- ITEM OUTFIT
INSERT INTO item_outfit (item_id, outfit_id) VALUES
(1, 1), (2, 1),
(3, 2),
(4, 3), (5, 3);

-- OUTFIT TAGS
INSERT INTO outfit_tags (tags_id, outfit_id) VALUES
(1, 1), (5, 1),
(3, 2),
(2, 3), (4, 3);
