CREATE TABLE korisnici (
    idKorisnika SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    uloga ENUM('korisnik', 'moderator') NOT NULL,
    datum_registracije TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela za kategorije recepata
CREATE TABLE kategorije (
    idKategorije SERIAL PRIMARY KEY,
    nazivK VARCHAR(50) UNIQUE NOT NULL
);

-- Tabela za recepte
CREATE TABLE recepti (
    idRecepta SERIAL PRIMARY KEY,
    idKorisnika INT NOT NULL REFERENCES korisnici(idKorisnika) ON DELETE CASCADE,
    nazivR VARCHAR(100) NOT NULL,
    sastojci TEXT NOT NULL,
    opis TEXT NOT NULL,
    saveti TEXT,
    slika_url TEXT,
    datumR TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Veza između recepata i kategorija (više kategorija po receptu)
CREATE TABLE recept_kategorija (
    idRecepta INT NOT NULL REFERENCES recepti(idRecepta) ON DELETE CASCADE,
    idKategorije INT NOT NULL REFERENCES kategorije(idKategorije) ON DELETE CASCADE,
    PRIMARY KEY (idRecepta, idKategorije)
);

-- Tabela za komentare
CREATE TABLE komentari (
    idKomentara SERIAL PRIMARY KEY,
    idRecepta INT NOT NULL REFERENCES recepti(idRecepta) ON DELETE CASCADE,
    idKorisnika INT NOT NULL REFERENCES korisnici(idKorisnika) ON DELETE CASCADE,
    tekst TEXT NOT NULL,
    datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela za lajkove
CREATE TABLE lajk (
    idRecepta INT NOT NULL REFERENCES recepti(idRecepta) ON DELETE CASCADE,
    idKorisnika INT NOT NULL REFERENCES korisnici(idKorisnika) ON DELETE CASCADE,
    PRIMARY KEY (idRecepta, idKorisnika)
);

-- Tabela za blog postove
CREATE TABLE blog_post (
    idBlogPost SERIAL PRIMARY KEY,
    idModerator INT NOT NULL REFERENCES korisnici(idKorisnika) ON DELETE CASCADE,
    naslovB VARCHAR(150) NOT NULL,
    sadrzaj TEXT NOT NULL,
    datumBP TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Veza između blog postova i preporučenih recepata
CREATE TABLE blog_preporuceni_recepti (
    idBlogPost INT NOT NULL REFERENCES blog_postovi(idBlogPost) ON DELETE CASCADE,
    idRecepta INT NOT NULL REFERENCES recepti(idRecepta) ON DELETE CASCADE,
    PRIMARY KEY (idBlogPost, idRecepta)
);
