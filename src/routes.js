const router = require("express").Router();
const Form = require("./controllers/FormController")
const Cards = require("./controllers/CardsController");


// Rotas para usuário
router.get("/form", Form.getForm);
router.post("/register", Form.createForm);
router.delete("/form/:id", Form.deleteForm);
router.put("/form/:id", Form.updateForm)
router.post("/login", Form.login);

// Rotas para cards
router.post("/cards/:userId", Cards.createCard);
router.get("/cards/:userId", Cards.readCards);
router.put("/cards/:userId/:id", Cards.updateCard);
router.delete("/cards/:userId/:id", Cards.deleteCard);


module.exports = router;
