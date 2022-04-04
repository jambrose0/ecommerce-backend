const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((tags) => {
      if (!tags) {
        res.status(404).json({ message: "No tags found with this id" });
        return;
      }
      res.json(tags);
    })
    .catch((err) => res.status(500).json(err));
});

// create a new tag
router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
    include: [Product],
  })
    .then((tags) => {
      if (!tags) {
        res.status(404).json({ message: "No tags found with this id" });
        return;
      }
      res.json(tags);
    })
    .catch((err) => res.status(500).json(err));
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tags) => {
      if (!tags) {
        res.status(404).json({ message: "No tags found with this id" });
        return;
      }
      res.json(tags);
    })
    .catch((err) => res.status(500).json(err));
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tags) => {
      if (!tags) {
        res.status(404).json({ message: "No tags found with this id" });
        return;
      }
      res.json(tags);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
