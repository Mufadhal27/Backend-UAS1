// import database
const db = require("../config/database");

// membuat class Alumni
class Alumni {
  static async all() {
    const query = "SELECT * from alumni";
    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
    return results;
  }

  static async create(alumniData) {
    const query = "INSERT INTO alumni SET ?";
    const result = await new Promise((resolve, reject) => {
      db.query(query, alumniData, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    return {
      id: result.insertId,
      ...alumniData,
    };
  }

  static async find(id) {
    const query = "SELECT * FROM alumni WHERE id = ?";
    const results = await new Promise((resolve, reject) => {
      db.query(query, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    const [alumni] = results;
    return alumni;
  }

  static async update(id, data) {
    const query = "UPDATE alumni SET ? WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      db.query(query, [data, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    // mencari data yang baru diupdate
    const alumni = await this.find(id);
    return alumni;
  }

  static async delete(id) {
    const query = "DELETE FROM alumni WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      db.query(query, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    return result;
  }

  static async search(name) {
    const query = "SELECT * FROM alumni WHERE name LIKE ?";
    const results = await new Promise((resolve, reject) => {
      db.query(query, `%${name}%`, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    return results;
  }

  static async findByStatus(status) {
    const query = "SELECT * FROM alumni WHERE status = ?";
    const results = await new Promise((resolve, reject) => {
      db.query(query, status, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    return results;
  }

  static async findFreshGraduate() {
    return this.findByStatus("fresh-graduate");
  }

  static async findEmployed() {
    return this.findByStatus("employed");
  }
}

// export class Alumni
module.exports = Alumni;
