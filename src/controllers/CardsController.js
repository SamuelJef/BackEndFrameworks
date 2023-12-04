// cardController.js
const Card = require("../models/cards");

module.exports = {
    async createCard(req, res) {
        try {
            const { title, description } = req.body;
            const userId = req.params.userId;

            const card = new Card({
                title,
                description,
                userId,
            });

            await card.save();

            res.json(card);
        } catch (error) {
            console.error("Error creating card:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async readCards(req, res) {
        try {
            const userId = req.params.userId;
            const cards = await Card.find({ userId });

            res.json(cards);
        } catch (error) {
            console.error("Error reading cards:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async updateCard(req, res) {
        try {
            const { id, userId } = req.params;
            const { title, description } = req.body;

            const card = await Card.findOneAndUpdate(
                { _id: id, userId },
                { title, description },
                { new: true }
            );

            if (!card) {
                return res.status(404).json({ error: "Card not found" });
            }

            res.json(card);
        } catch (error) {
            console.error("Error updating card:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async deleteCard(req, res) {
        try {
            const { id, userId } = req.params;

            const card = await Card.findOneAndDelete({ _id: id, userId });

            if (!card) {
                return res.status(404).json({ error: "Card not found" });
            }

            res.json(card);
        } catch (error) {
            console.error("Error deleting card:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};
