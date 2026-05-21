import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import horoscopeRoutes from './routes/horoscopeRoutes';
import chartRoutes from './routes/chartRoutes';
import tarotRoutes from './routes/tarotRoutes';
import moonRoutes from './routes/moonRoutes';
import eventsRoutes from './routes/eventsRoutes';
import compatibilityRoutes from './routes/compatibilityRoutes';
import journalRoutes from './routes/journalRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

export const app = express();

app.use('/api/subscription/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(helmet());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/horoscopes', horoscopeRoutes);
app.use('/api/chart', chartRoutes);
app.use('/api/tarot', tarotRoutes);
app.use('/api/moon', moonRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/compatibility', compatibilityRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);
