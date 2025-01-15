// import database
const db = require("../config/database");

// membuat class Alumni
class Alumni {
  static async all() {
    const query = "SELECT * from alumnis";
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

  static async create(alumnisData) {
    const query = "INSERT INTO alumnis SET ?";
    const result = await new Promise((resolve, reject) => {
      db.query(query, alumnisData, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    return {
      id: result.insertId,
      ...alumnisData,
    };
  }

  static async find(id) {
    const query = "SELECT * FROM alumnis WHERE id = ?";
    const results = await new Promise((resolve, reject) => {
      db.query(query, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });

    const [alumnis] = results;
    return alumnis;
  }

  static async update(id, data) {
    const query = "UPDATE alumnis SET ? WHERE id = ?";
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
    const query = "DELETE FROM alumnis WHERE id = ?";
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
    const query = "SELECT * FROM alumnis WHERE name LIKE ?";
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
    const query = "SELECT * FROM alumnis WHERE status = ?";
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
