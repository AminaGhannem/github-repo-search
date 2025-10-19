// server.ts
import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Serve built files
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
