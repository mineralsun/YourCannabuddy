CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "products" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"product_name" VARCHAR(1000) NOT NULL,
	"brand_name" VARCHAR(100) NOT NULL,
	"product_id" INT REFERENCES "productType",
	"rating" INT DEFAULT(0) NOT NULL,
	"comments" VARCHAR(50000),
	"top_effect_id" INT REFERENCES "topEffect",
	"isFavorite" BOOLEAN DEFAULT(FALSE) NOT NULL
);

CREATE TABLE "productType" (
	"id" SERIAL PRIMARY KEY,
	"typeName" VARCHAR(100)
);

CREATE TABLE "topEffect" (
	"id" SERIAL PRIMARY KEY,
	"top_effect_name" VARCHAR(100)
);

-- ! Shouldn't be required in the current mode
-- CREATE TABLE "productType_topEffect" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"product_id" INT REFERENCES "productType" NOT NULL,
-- 	"top_effect_id" INT REFERENCES "topEffect" NOT NULL
-- );

INSERT INTO "productType" ("typeName")
VALUES ('Flower'), ('Pre-Rolls'), ('Edibles'), ('Vaporizers'), ('Concentrates'), ('Topicals'), ('Tinctures');

INSERT INTO "topEffect" ("top_effect_name")
VALUES ('Calm'), ('Pain-Relief'), ('Clear-Mind'), ('Creative'), ('Energetic'), ('Focused'), ('Happy'), ('Inspired'), ('Relaxed'), ('Sleepy');

INSERT INTO "user" ("username", "password")
VALUES ('test', 'pr1m3');

INSERT INTO "products" ("user_id", "product_name", "brand_name", "product_id", "rating", "comments", "top_effect_id", "isFavorite")
VALUES (1, 'Ghost OG', 'Illicit', 1, 5, 'One of the best hybrids on the market. Energetic in the head, relaxing in the body. Truly the best of both worlds!', 5, TRUE);

-- ! Should not be required in the current mode
-- SELECT * FROM "productType" 
-- JOIN "productType_topEffect" ON "productType"."id" = "productType_topEffect"."product_id";

-- SELECT * FROM "topEffect"
-- JOIN "productType_topEffect" ON "topEffect"."id" = "productType_topEffect"."top_effect_id";

SELECT "product_name", "typeName" FROM "products"
JOIN "productType" ON "products"."product_id" = "productType"."id";

-- ! I don't believe this is required in the current state of the project
-- INSERT INTO "productType_topEffect" ("product_id", "top_effect_id")
-- VALUES (1, 5);

-- INSERT INTO "productType_topEffect" ("product_id", "top_effect_id")
-- VALUES (3, 2), (3, 7);

DELETE FROM "products" WHERE "id" = "$1";

INSERT INTO "products" ("user_id", "product_name", "brand_name", "product_id", "rating", "comments", "top_effect_id", "isFavorite")
VALUES (1, 'Strawberry Float', 'Illicit', 1, 3, 'Great tasting indica! Not to heavy!', 10, TRUE);

SELECT * FROM "products" WHERE "id" = "$1";

-- ? For testing!
UPDATE "products" 
SET "product_name" = 'Strawberry Float', "brand_name" = 'Illicit', "product_id" = 1, "rating" = 4, "comments" = 'Really great functional indica. great flavor!', "top_effect_id" = 9, "isFavorite" = (false)
WHERE "id" = 28 AND "user_id" = 1;

SELECT "products".* FROM "products" 
JOIN "productType" ON "products"."product_id" = "productType"."id"
JOIN "topEffect" ON "products"."top_effect_id" = "topEffect"."id"
WHERE "user_id" = "$1";

SELECT "products".*, 
"topEffect"."top_effect_name" AS "top_effect_id", 
"productType"."typeName" AS "product_id"
FROM "products"
JOIN "productType" ON "products"."product_id" = "productType"."id"
JOIN "topEffect" ON "products"."top_effect_id" = "topEffect"."id"
WHERE "user_id" = "$1";

SELECT "products"."product_id", 
"productType"."typeName" AS "product_id"
FROM "products"
JOIN "productType" ON "products"."product_id" = "productType"."id"
WHERE "user_id" = "$1";

SELECT "products"."product_id", 
"productType"."typeName" AS "product_id"
FROM "products"
JOIN "productType" ON "products"."product_id" = "productType"."id"
WHERE "product_id" = "$1" AND "user_id" = "$2";

SELECT "products".*, 
"topEffect"."top_effect_name" AS "top_effect_id", 
"productType"."typeName" AS "product_id"
FROM "products"
JOIN "productType" ON "products"."product_id" = "productType"."id"
JOIN "topEffect" ON "products"."top_effect_id" = "topEffect"."id"
WHERE "user_id" = "$1" AND "product_id" = "$2";

SELECT "products".*, "productType"."typeName" AS "product_id"
FROM "products"
JOIN "productType" ON "products"."product_id" = "productType"."id"
WHERE "product_id" = "$1";