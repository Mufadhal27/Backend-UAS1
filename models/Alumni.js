// import database
const db = require("../config/database");

// membuat class Alumni
class Alumni {
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * from alumnis";
      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  static async create(data) {
    // melakukan insert data ke database
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumnis SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });
  
    // melakukan query berdasarkan id
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumnis WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static find(id) {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM alumnis WHERE id = ?";
          db.query(sql, id, (err, results) => {
              // destructing array
              const [alumni] = results;
              resolve(alumni);
          });
      });
  }

  // mengupdate data alumni
  static async update(id, data) {
      await new Promise((resolve, reject) => {
          const sql = "UPDATE alumnis SET ? WHERE id = ?";
          db.query(sql, [data, id], (err, results) => {
              resolve(results);
          });
      });

      // mencari data yang baru diupdate
      const alumni = await this.find(id);
      return alumni;
  }


  // menghapus data dari database
  static delete(id) {
      return new Promise((resolve, reject) => {
          const sql = "DELETE FROM alumnis WHERE id = ?";
          db.query(sql, id, (err, results) => {
              resolve(results);
          });
      });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumnis WHERE name LIKE ?";
      db.query(sql, `%${name}%`, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumnis WHERE status = ?";
      db.query(sql, status, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static findFreshGraduate() {
    return this.findByStatus("fresh-graduate");
  }

  static findEmployed() {
    return this.findByStatus("employed");
  }
}

// export class Alumni
module.exports = Alumni;
