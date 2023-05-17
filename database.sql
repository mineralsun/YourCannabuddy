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
	"user_id" INT,
	"product_name" VARCHAR(1000) NOT NULL,
	"brand_name" VARCHAR(100) NOT NULL,
	"product_id" INT REFERENCES "productType",
	"rating" INT DEFAULT(0) NOT NULL,
	"comments" VARCHAR(50000),
	"top_effect_id" INT REFERENCES "topEffect",
	"isFavorite" BOOLEAN DEFAULT(FALSE) NOT NULL
);
