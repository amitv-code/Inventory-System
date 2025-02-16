import { useState, useEffect } from 'react';
import axios from 'axios';

const BulkEdit = () => {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkEditField, setBulkEditField] = useState('price');
  const [bulkEditValue, setBulkEditValue] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBulkUpdate = async () => {
    try {
      const updates = Array.from(selectedIds).map(id => ({
        _id: id,
        changes: { [bulkEditField]: bulkEditValue }
      }));

      await axios.patch('http://localhost:5000/api/products/bulk', updates);
      fetchProducts();
      setSelectedIds(new Set());
      setBulkEditValue('');
    } catch (error) {
      console.error('Bulk update failed:', error);
    }
  };

  const toggleSelection = (productId) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedIds(newSelection);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bulk Edit Products</h2>
      
      {/* Bulk Edit Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-4 items-center">
          <select 
            value={bulkEditField}
            onChange={(e) => setBulkEditField(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="price">Price</option>
            <option value="currentStock">Stock Quantity</option>
            <option value="vendor">Vendor</option>
          </select>
          
          <input
            type={bulkEditField === 'price' ? 'number' : 'text'}
            placeholder={`New ${bulkEditField}`}
            value={bulkEditValue}
            onChange={(e) => setBulkEditValue(e.target.value)}
            className="p-2 border rounded flex-grow"
          />
          
          <button
            onClick={handleBulkUpdate}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Apply to Selected ({selectedIds.size})
          </button>
        </div>
      </div>

      {/* Editable Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(product._id)}
                    onChange={() => toggleSelection(product._id)}
                  />
                </td>
                <td className="px-4 py-2">{product.sku}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.vendor}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.currentStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BulkEdit;