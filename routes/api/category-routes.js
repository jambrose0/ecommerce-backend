const router = require("express").Router();
const { Category, Product } = require("../../models");
const { sequelize } = require("../../models/Product");

// The `/api/categories` endpoint
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // Category.findOne({});
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update({});
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({});
});

module.exports = router;
