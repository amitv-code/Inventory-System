import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/inventory" className="hover:text-gray-300">Inventory</Link>
        <Link to="/bulk-upload" className="hover:text-gray-300">Bulk Upload</Link>
        <Link to="/bulk-edit" className="hover:text-gray-300">Bulk Edit</Link>
      </div>
    </nav>
  );
};

export default Navbar;