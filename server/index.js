import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email va parol kiritilishi shart!" });
  }

  const users = db.getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Email yoki parol xato kiritildi!" });
  }

  return res.json({
    message: "Muvaffaqiyatli kirildi!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '+998 94 034 71 71'
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring!" });
  }

  const users = db.getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "Bu email bilan ro'yxatdan o'tilgan!" });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    role: email.toLowerCase() === 'admin@telefon.com' ? 'admin' : 'client',
    phone: phone || '+998 90 000 00 00',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  db.saveUsers(users);

  return res.status(201).json({
    message: "Ro'yxatdan muvaffaqiyatli o'tdingiz!",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone
    }
  });
});

// --- PRODUCT CRUD ROUTES ---

// 1. GET ALL PRODUCTS
app.get('/api/products', (req, res) => {
  const products = db.getProducts();
  res.json(products);
});

// 2. CREATE PRODUCT (Admin)
app.post('/api/products', (req, res) => {
  const { name, category, price, image, stockStatus, stock, description } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: "Mahsulot nomi, kategoriyasi va narxi kiritilishi shart!" });
  }

  const products = db.getProducts();
  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    category: category || 'Full Phone',
    price: Number(price),
    image: image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    stockStatus: stockStatus || 'In Stock',
    stock: Number(stock) || 10,
    description: description || 'TechFixHub sifatli mahsuloti.',
    createdAt: new Date().toISOString()
  };

  products.unshift(newProduct);
  db.saveProducts(products);

  console.log(`[CRUD] Added Product: ${newProduct.name} (${newProduct.id})`);
  res.status(201).json({
    message: "Mahsulot muvaffaqiyatli qo'shildi!",
    product: newProduct
  });
});

// 3. EDIT PRODUCT (Admin)
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, price, image, stockStatus, stock, description } = req.body;

  const products = db.getProducts();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Mahsulot topilmadi!" });
  }

  const updatedProduct = {
    ...products[index],
    name: name !== undefined ? name : products[index].name,
    category: category !== undefined ? category : products[index].category,
    price: price !== undefined ? Number(price) : products[index].price,
    image: image !== undefined ? image : products[index].image,
    stockStatus: stockStatus !== undefined ? stockStatus : products[index].stockStatus,
    stock: stock !== undefined ? Number(stock) : products[index].stock,
    description: description !== undefined ? description : products[index].description,
    updatedAt: new Date().toISOString()
  };

  products[index] = updatedProduct;
  db.saveProducts(products);

  console.log(`[CRUD] Updated Product: ${updatedProduct.name} (${id})`);
  res.json({
    message: "Mahsulot ma'lumotlari yangilandi!",
    product: updatedProduct
  });
});

// 4. DELETE PRODUCT (Admin)
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  let products = db.getProducts();
  const existing = products.find(p => p.id === id);

  if (!existing) {
    return res.status(404).json({ error: "Mahsulot topilmadi!" });
  }

  products = products.filter(p => p.id !== id);
  db.saveOrders(db.getOrders()); // Keep orders consistent
  db.saveProducts(products);

  console.log(`[CRUD] Deleted Product: ${existing.name} (${id})`);
  res.json({
    message: "Mahsulot o'chirildi!",
    deletedId: id
  });
});

// --- ORDER ROUTES ---

// 1. POST ORDER (User Order & Telegram Alert Format)
app.post('/api/orders', (req, res) => {
  const { customerName, customerPhone, address, items, totalAmount, notes } = req.body;

  if (!customerName || !customerPhone || !items || items.length === 0) {
    return res.status(400).json({ error: "Buyurtma berish uchun barcha ma'lumotlarni to'ldiring!" });
  }

  const orders = db.getOrders();
  const newOrder = {
    id: `ord-${Date.now().toString().slice(-4)}`,
    customerName,
    customerPhone,
    address: address || 'Do\'kondan olib ketish',
    items,
    totalAmount: Number(totalAmount),
    status: 'Yangi', // 'Yangi', 'Bajarildi', 'Bekor qilindi'
    notes: notes || '',
    telegramSent: true,
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  db.saveOrders(orders);

  // Format Telegram notification text for @Salox71
  const telegramMessage = `
🛒 **Yangi Buyurtma!** (ID: ${newOrder.id})
👤 Xaridor: ${customerName}
📞 Tel: ${customerPhone}
📍 Manzil: ${newOrder.address}
🛍 Maxsulotlar:
${items.map(item => `  • ${item.name} (${item.quantity}x) - $${item.price}`).join('\n')}
💵 Jami summasi: $${newOrder.totalAmount}
📝 Izoh: ${newOrder.notes || 'Yo\'q'}
  `.trim();

  console.log(`[ORDER & TELEGRAM @Salox71] New Order Saved:\n${telegramMessage}`);

  res.status(201).json({
    message: "Buyurtmangiz qabul qilindi! Tezgora aloqaga chiqamiz.",
    order: newOrder,
    telegramFormattedText: telegramMessage,
    telegramLink: `https://t.me/Salox71`
  });
});

// 2. GET ADMIN ORDERS
app.get('/api/admin/orders', (req, res) => {
  const orders = db.getOrders();
  res.json(orders);
});

// 3. UPDATE ORDER STATUS (Admin: Yangi -> Bajarildi / Bekor qilindi)
app.put('/api/admin/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status ko'rsatilmadi!" });
  }

  const orders = db.getOrders();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ error: "Buyurtma topilmadi!" });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  db.saveOrders(orders);
  console.log(`[ORDER STATUS] Order ${id} updated to ${status}`);

  res.json({
    message: `Buyurtma statusi "${status}" ga o'zgartirildi!`,
    order
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 TechFixHub Express Server running on http://localhost:${PORT}`);
});

