import express from 'express';
import Product from '../models/Product.js';
import csvParser from 'csv-parser';
import stream from 'stream';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/products/bulk', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    
    const products = [];
    
    bufferStream
      .pipe(csvParser())
      .on('data', (row) => {
        products.push({
          sku: row.SKU,
          name: row.Name,
          vendor: row.Vendor,
          price: parseFloat(row.Price),
          currentStock: parseInt(row.Stock),
          description: row.Description
        });
      })
      .on('end', async () => {
        try {
          await Product.insertMany(products);
          res.status(201).json({ message: `${products.length} products imported` });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bulk update products
router.patch('/bulk', async (req, res) => {
  try {
    const updates = req.body;
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: update._id },
        update: { $set: update.changes }
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