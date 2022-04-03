const router = require("express").Router();
const { Category, Product } = require("../../models");
const { sequelize } = require("../../models/Product");

// find all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

// find one category
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

// create a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categories) => {
      if (!categories) {
        res.status(404).json({ message: "No categories found with this id" });
        return;
      }
      res.json(categories);
    })
    .catch((err) => res.status(500).json(err));
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
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

module.exports = router;
