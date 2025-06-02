import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from 'dotenv';
import contactRouter from './routes/contact';
// Load environment variables
dotenv.config();

// Verify environment variables
console.log('Environment Variables Check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Missing');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set' : '✗ Missing');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api', contactRouter);

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection initialized");
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});