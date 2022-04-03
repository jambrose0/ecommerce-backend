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
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((categories) => {
      if (!categories) {
        res.status(404).json({ message: "No categories found with this id" });
        return;
      }
      res.json(categories);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update({
    category,
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({});
});

module.exports = router;
