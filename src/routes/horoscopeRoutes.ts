import { Router } from 'express';
import { getDailyAll, getHoroscope } from '../controllers/horoscopeController';

const router = Router();

router.get('/today/all', getDailyAll);
router.get('/daily/:sign', (req, res, next) => {
  req.params.period = 'daily';
  return getHoroscope(req, res, next);
});
router.get('/weekly/:sign', (req, res, next) => {
  req.params.period = 'weekly';
  return getHoroscope(req, res, next);
});
router.get('/monthly/:sign', (req, res, next) => {
  req.params.period = 'monthly';
  return getHoroscope(req, res, next);
});
router.get('/yearly/:sign', (req, res, next) => {
  req.params.period = 'yearly';
  return getHoroscope(req, res, next);
});

export default router;
