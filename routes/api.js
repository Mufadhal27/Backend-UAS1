// import AlumniController
const AlumniController = require("../controllers/AlumniController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});

// Membuat routing alumni
router.get("/alumnis", AlumniController.index); // GET: Tampilkan semua alumni
router.post("/alumnis", AlumniController.store); // POST: Tambahkan alumni baru
router.put("/alumnis/:id", AlumniController.update); // PUT: Update alumni berdasarkan ID
router.delete("/alumnis/:id", AlumniController.destroy); // DELETE: Hapus alumni berdasarkan ID
router.get("/alumnis/:id", AlumniController.show);
router.get("/alumnis/search/name", AlumniController.search);
router.get("/alumnis/status/fresh-graduate", AlumniController.freshGraduate);
router.get("/alumnis/status/employed", AlumniController.employed);

// export router
module.exports = router;
