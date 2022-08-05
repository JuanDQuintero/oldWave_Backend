import express from 'express';
import morgan from 'morgan';
import config from './config';

// Routes
import productsRoutes from './routes/products.routes';

const app = express();

// settings
app.set('port', config.port);

// Middlewares
app.use(morgan('dev'));

// Routes
app.use('/api/products', productsRoutes);

export default app;
