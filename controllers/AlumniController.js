// import Model Alumni
const Alumni = require("../models/Alumni");

// buat class AlumniController
class AlumniController {
  async index(req, res) {
    const alumnis = await Alumni.all();

    const data = {
      message: "Menampilkan semua alumni",
      data: alumnis,
    };

    res.json(data);
  } 


  async store(req, res) {
    
    const alumni = await Alumni.create(req.body);

    const data = {
      message: "Menambahkan data alumni",
      data: alumni,
    };

    res.json(data);
  }


  async update(req, res) {
    const { id } = req.params;

    const alumni = await Alumni.find(id);

    if (alumni) {
      const alumni = await Alumni.update(id, req.body);
      const data = {
        message: `Mengedit data alumni`,
        data: alumni,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Alumni not found`,
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
        await Alumni.delete(id);
        const data = {
            message: `Menghapus data alumni`,
        };

        res.status(200).json(data);
    } else {
        const data = {
            message: `Alumni not found`,
        };

        res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      const data = {
        message: "Menampilkan detail alumni",
        data: alumni,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Alumni not found",
      };
      res.status(404).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params;
    const results = await Alumni.search(name);

    const data = {
      message: `Menampilkan alumni berdasarkan nama: ${name}`,
      data: results,
    };

    res.status(200).json(data);
  }

  async freshGraduate(req, res) {
    const results = await Alumni.findFreshGraduate();

    const data = {
      message: "Menampilkan alumni fresh graduate",
      data: results,
    };

    res.status(200).json(data);
  }

  async employed(req, res) {
    const results = await Alumni.findEmployed();

    const data = {
      message: "Menampilkan alumni employed",
      data: results,
    };

    res.status(200).json(data);
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
