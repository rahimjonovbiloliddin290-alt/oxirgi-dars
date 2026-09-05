import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Initial seed products
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'iPhone 15 Pro Max 256GB - Titanium Natural',
    category: 'Full Phone',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 12,
    description: 'A17 Pro chip, titanium design, 48MP main camera system, Type-C USB 3 speeds.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 512GB - Titanium Black',
    category: 'Full Phone',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 8,
    description: 'Galaxy AI integrated, 200MP camera, Snapdragon 8 Gen 3, S-Pen included.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'OLED Display Screen Assembly - iPhone 14 Pro',
    category: 'Display',
    price: 185,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 25,
    description: 'Original Super Retina XDR OLED display with Dynamic Island IC support.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-4',
    name: 'AMOLED Screen Display - Samsung S23 Ultra',
    category: 'Display',
    price: 210,
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 15,
    description: 'Dynamic AMOLED 2X panel with touch digitizer & pre-installed frame.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-5',
    name: 'High Capacity Battery 4352mAh - iPhone 13 Pro Max',
    category: 'Battery',
    price: 45,
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 40,
    description: 'Zero cycle original chip battery with thermal protection & installation tape.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-6',
    name: 'Original 5000mAh Battery - Samsung Galaxy A54',
    category: 'Battery',
    price: 35,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 30,
    description: 'Genuine fast charging battery replacement with safety protection microchip.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-7',
    name: '48MP Triple Rear Camera Module - iPhone 14 Pro Max',
    category: 'Camera',
    price: 120,
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 10,
    description: 'Complete main camera assembly with sensor-shift optical image stabilization.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-8',
    name: 'Ultra Wide Front Selfie Camera - Xiaomi Redmi Note 12',
    category: 'Camera',
    price: 25,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    stockStatus: 'In Stock',
    stock: 18,
    description: '16MP front facing camera flex cable replacement module.',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_USERS = [
  {
    id: 'user-admin',
    name: 'TechFix Administrator',
    email: 'admin@telefon.com',
    password: 'telefon123',
    role: 'admin',
    phone: '+998 94 034 71 71',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-client-1',
    name: 'Jasur Bek',
    email: 'jasur@gmail.com',
    password: 'user123',
    role: 'client',
    phone: '+998 90 123 45 67',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ord-1001',
    customerName: 'Jasur Bek',
    customerPhone: '+998 90 123 45 67',
    address: 'Toshkent sh., Chilonzor 19-mavze, 12-uy',
    items: [
      {
        id: 'prod-3',
        name: 'OLED Display Screen Assembly - iPhone 14 Pro',
        price: 185,
        quantity: 1
      }
    ],
    totalAmount: 185,
    status: 'Yangi', // Yangi, Bajarildi, Bekor qilindi
    notes: 'Iltimos, tezroq yetkazib bering',
    telegramSent: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

// Helper functions for safely reading/writing JSON files
function readJSON(filePath, defaultData) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultData;
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

export const db = {
  getProducts: () => readJSON(PRODUCTS_FILE, INITIAL_PRODUCTS),
  saveProducts: (products) => writeJSON(PRODUCTS_FILE, products),

  getUsers: () => readJSON(USERS_FILE, INITIAL_USERS),
  saveUsers: (users) => writeJSON(USERS_FILE, users),

  getOrders: () => readJSON(ORDERS_FILE, INITIAL_ORDERS),
  saveOrders: (orders) => writeJSON(ORDERS_FILE, orders),
};
