import { Router } from 'express';
import { getEvent, getEventsBySign, listEvents } from '../controllers/eventsController';

const router = Router();

router.get('/', listEvents);
router.get('/by-sign/:sign', getEventsBySign);
router.get('/:id', getEvent);

export default router;
