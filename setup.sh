# Create root project directory
mkdir inventory-system
cd inventory-system

# Create backend structure
mkdir server
cd server
mkdir config controllers models routes utils middleware
touch server.js

# Create shared directory for common files
cd ..
mkdir shared
cd shared
mkdir pdfTemplates

# Create frontend structure using Vite
cd ..
npm create vite@latest client -- --template react
cd client
mkdir src/components src/pages src/contexts src/hooks src/utils
mkdir src/assets src/styles
touch src/styles/tailwind.css

# Create main pages structure
touch src/pages/Home.jsx
touch src/pages/Dashboard.jsx
touch src/pages/Inventory.jsx
touch src/pages/Orders.jsx
touch src/pages/PurchaseOrders.jsx
touch src/pages/DeliveryTracking.jsx
touch src/pages/ShopifyIntegration.jsx