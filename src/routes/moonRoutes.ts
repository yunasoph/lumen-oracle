import { Router } from 'express';
import { getCurrentMoon, getMoonCalendar, getUpcomingMoon } from '../controllers/moonController';

const router = Router();

router.get('/current', getCurrentMoon);
router.get('/upcoming', getUpcomingMoon);
router.get('/calendar/:year/:month', getMoonCalendar);

export default router;
