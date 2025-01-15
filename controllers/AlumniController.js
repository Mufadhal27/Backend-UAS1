// import Model Alumni
const Alumni = require("../models/Alumni");

// buat class AlumniController
class AlumniController {
  async index(req, res) {
    try {
      const alumnis = await Alumni.all();
      const data = {
        message: "Menampilkan semua alumni",
        data: alumnis,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal mengambil data alumni",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async store(req, res) {
    try {
      const { name, phone, address, graduation_year, status, company_name, position } = req.body;

      if (!name || !phone || !address || !graduation_year) {
        const data = {
          message: "All fields must be filled correctly",
        };
        return res.status(422).json(data);
      }

      const newAlumni = await Alumni.create({
        name,
        phone,
        address,
        graduation_year,
        status,
        company_name,
        position,
      });

      const data = {
        message: "Resource is added successfully",
        data: newAlumni,
      };
      res.status(201).json(data);
    } catch (error) {
      const data = {
        message: "Gagal menambahkan data alumni",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const alumnis = await Alumni.find(id);

      if (!alumnis) {
        const data = {
          message: "Alumni not found",
        };
        return res.status(404).json(data);
      }

      const updatedAlumni = await Alumni.update(id, req.body);
      const data = {
        message: "Resource is updated successfully",
        data: updatedAlumni,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal mengedit data alumni",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const alumnis = await Alumni.find(id);

      if (!alumnis) {
        const data = {
          message: "Alumni not found",
        };
        return res.status(404).json(data);
      }

      await Alumni.delete(id);
      const data = {
        message: "Resource is deleted successfully",
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal menghapus data alumni",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const alumnis = await Alumni.find(id);

      if (!alumnis) {
        const data = {
          message: "Alumni not found",
        };
        return res.status(404).json(data);
      }

      const data = {
        message: "Menampilkan detail alumni",
        data: alumnis,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal menampilkan detail alumni",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async search(req, res) {
    try {
      const { name } = req.params;
      const results = await Alumni.search(name);

      const data = {
        message: `Menampilkan alumni berdasarkan nama: ${name}`,
        data: results,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal mencari data alumni",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async freshGraduate(req, res) {
    try {
      const results = await Alumni.findFreshGraduate();

      const data = {
        message: "Menampilkan alumni fresh graduate",
        data: results,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal menampilkan data fresh graduate",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async employed(req, res) {
    try {
      const results = await Alumni.findEmployed();

      const data = {
        message: "Menampilkan alumni employed",
        data: results,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: "Gagal menampilkan data employed",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
