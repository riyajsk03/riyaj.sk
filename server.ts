import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const DATA_FILE = path.join(process.cwd(), 'portfolio-data.json');

// Helper to get portfolio data
function getStoredData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading portfolio-data.json:', e);
    }
  }
  return null;
}

// Helper to save portfolio data
function saveStoredData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing portfolio-data.json:', e);
    return false;
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Crawlers & SEO Routes
app.get('/sitemap.xml', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(filePath)) {
    res.type('application/xml').sendFile(filePath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/robots.txt', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(filePath)) {
    res.type('text/plain').sendFile(filePath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get(['/llms.txt', '/Ilms.txt'], (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'llms.txt');
  if (fs.existsSync(filePath)) {
    res.type('text/plain; charset=utf-8').sendFile(filePath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/api/portfolio', (req, res) => {
  const data = getStoredData();
  res.json({ success: true, data });
});

app.post('/api/portfolio', (req, res) => {
  const { adminEmail, data } = req.body;
  if (adminEmail !== 'xriyajsk@gmail.com') {
    return res.status(403).json({ success: false, error: 'Unauthorized. Admin email mismatch.' });
  }
  if (!data) {
    return res.status(400).json({ success: false, error: 'No data provided.' });
  }

  const saved = saveStoredData(data);
  if (saved) {
    res.json({ success: true, message: 'Portfolio updated successfully on server.' });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write data to disk.' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required.' });
  }
  console.log(`[Contact Form Submission] From: ${name} <${email}> | Subject: ${subject}`);
  res.json({
    success: true,
    message: 'Your message has been delivered to Riyaj Sk! You will receive a response shortly.'
  });
});

app.post('/api/admin/verify', (req, res) => {
  const { email } = req.body;
  if (email === 'xriyajsk@gmail.com') {
    return res.json({
      success: true,
      isAdmin: true,
      user: {
        email: 'xriyajsk@gmail.com',
        name: 'Riyaj Sk',
        role: 'Administrator'
      }
    });
  }
  res.status(403).json({ success: false, isAdmin: false, error: 'Access denied: not an authorized admin.' });
});

// Vite Middleware integration
async function setupViteAndListen() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteAndListen();
