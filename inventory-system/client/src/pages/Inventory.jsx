import { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    sku: '',
    name: '',
    vendor: '',
    price: 0,
    currentStock: 0
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      fetchProducts();
      setNewProduct({ sku: '', name: '', vendor: '', price: 0, currentStock: 0 });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      
      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="SKU"
            value={newProduct.sku}
            onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Vendor"
            value={newProduct.vendor}
            onChange={(e) => setNewProduct({...newProduct, vendor: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.currentStock}
            onChange={(e) => setNewProduct({...newProduct, currentStock: e.target.value})}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
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

export default Inventory;