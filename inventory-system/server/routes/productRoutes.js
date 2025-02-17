import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Create product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the bulk update endpoint
router.patch('/bulk', async (req, res) => {
  try {
    const updates = req.body;
    
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: update._id },
        update: { 
          $set: {
            ...update.changes,
            // Convert numeric fields explicitly
            price: update.changes.price ? Number(update.changes.price) : undefined,
            currentStock: update.changes.currentStock ? Number(update.changes.currentStock) : undefined
          }
        }
      }
    }));

    const result = await Product.bulkWrite(bulkOps);
    res.json({
      message: `Updated ${result.nModified} products`,
      result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;