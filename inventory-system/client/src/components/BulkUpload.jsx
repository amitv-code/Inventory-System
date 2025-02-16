import { useState } from 'react';
import axios from 'axios';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/products/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setMessage(response.data.message);
      setFile(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Bulk Product Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Upload CSV
        </button>
        {message && <p className="mt-4 p-2 bg-gray-100 rounded">{message}</p>}
      </form>

      <div className="mt-8">
        <h3 className="font-medium mb-2">CSV Format Example:</h3>
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">SKU</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Vendor</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">PROD001</td>
              <td className="border border-gray-300 p-2">T-Shirt</td>
              <td className="border border-gray-300 p-2">Vendor A</td>
              <td className="border border-gray-300 p-2">19.99</td>
              <td className="border border-gray-300 p-2">100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BulkUpload;