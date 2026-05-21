import { Router } from 'express';
import {
  getDailyAll,
  getDailyHoroscope,
  getMonthlyHoroscope,
  getWeeklyHoroscope,
  getYearlyHoroscope,
} from '../controllers/horoscopeController';

const router = Router();

router.get('/today/all', getDailyAll);
router.get('/daily/:sign', getDailyHoroscope);
router.get('/weekly/:sign', getWeeklyHoroscope);
router.get('/monthly/:sign', getMonthlyHoroscope);
router.get('/yearly/:sign', getYearlyHoroscope);

export default router;
