CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "productType" (
	"id" SERIAL PRIMARY KEY,
	"typeName" VARCHAR(100)
);

CREATE TABLE "topEffect" (
	"id" SERIAL PRIMARY KEY,
	"top_effect_name" VARCHAR(100)
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

INSERT INTO "user" ("username", "password")
VALUES ('your_name_here', 'your_password_here');

INSERT INTO "productType" ("typeName")
VALUES ('Flower'), ('Pre-Rolls'), ('Edibles'), ('Vaporizers'), ('Concentrates'), ('Topicals'), ('Tinctures');

INSERT INTO "topEffect" ("top_effect_name")
VALUES ('Calm'), ('Pain-Relief'), ('Clear-Mind'), ('Creative'), ('Energetic'), ('Focused'), ('Happy'), ('Inspired'), ('Relaxed'), ('Sleepy');



INSERT INTO "products" ("user_id", "product_name", "brand_name", "product_id", "rating", "comments", "top_effect_id", "isFavorite")
VALUES (1, 'Ghost OG', 'Illicit', 1, 5, 'One of the best hybrids on the market. Energetic in the head, relaxing in the body. Truly the best of both worlds!', 5, TRUE);