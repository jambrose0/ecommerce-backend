const router = require("express").Router();
const { Category, Product } = require("../../models");
const { sequelize } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      "id",
      "category_name",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM category WHERE product.id = product.category_id)"
        ),
        "productCategories",
      ],
    ],
  })
    .then((dbData) => {
      const categories = dbData.map((category) =>
        category.get({ plain: true })
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({});
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
