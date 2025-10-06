const express = require('express');
const router = express.Router();

// In-memory array for storing cards
let cards = [];
let nextId = 1;

/**
 * GET /api/cards
 * List all cards
 */
router.get('/cards', (req, res) => {
    res.json(cards);
});

/**
 * POST /api/cards
 * Add a new card
 * Body: { suit: string, value: string }
 */
router.post('/cards', (req, res) => {
    const { suit, value } = req.body;

    if (!suit || !value) {
        return res.status(400).json({ error: "Suit and value are required" });
    }

    const newCard = { id: nextId++, suit, value };
    cards.push(newCard);

    res.status(201).json(newCard);
});

/**
 * GET /api/cards/:id
 * Get a card by ID
 */
router.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);

    if (!card) {
        return res.status(404).json({ error: "Card not found" });
    }

    res.json(card);
});

/**
 * DELETE /api/cards/:id
 * Delete a card by ID
 */
router.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Card not found" });
    }

    const deletedCard = cards.splice(index, 1);
    res.json({ message: "Card deleted", card: deletedCard[0] });
});

module.exports = router;