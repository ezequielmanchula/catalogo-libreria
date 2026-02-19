const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.resolve(__dirname, "db.sqlite");

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            category text, 
            price real, 
            description text
            )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                const insert = 'INSERT INTO articles (name, category, price, description) VALUES (?,?,?,?)';
                db.run(insert, ["Cuaderno A4", "Papelería", 5.50, "Cuaderno universitario A4 rayado, 80 hojas."]);
                db.run(insert, ["Lápiz HB", "Escritura", 0.80, "Lápiz grafito HB de alta calidad."]);
                db.run(insert, ["Bolígrafo Azul", "Escritura", 1.20, "Bolígrafo de tinta azul, trazo medio."]);
                db.run(insert, ["Regla 30cm", "Geometría", 2.00, "Regla de plástico transparente de 30cm."]);
                db.run(insert, ["Carpeta", "Organización", 3.50, "Carpeta con fuelle y elástico."]);
                db.run(insert, ["Goma de Borrar", "Escritura", 0.50, "Goma blanca suave, no mancha."]);
                db.run(insert, ["Sacapuntas", "Escritura", 1.00, "Sacapuntas metálico con depósito."]);
                db.run(insert, ["Resaltador Amarillo", "Escritura", 1.50, "Marcador fluorescente punta biselada."]);
                db.run(insert, ["Block de Notas", "Papelería", 2.50, "Block de notas adhesivas 76x76mm."]);
                db.run(insert, ["Tijeras", "Manualidades", 4.00, "Tijeras de acero inoxidable 17cm."]);
            }
        });  
    }
});

module.exports = db;
