import parseISO from 'date-fns/parseISO';
import { Router } from 'express';
import CreateAppointment from '../controllers/CreateAppointment';
import prismaClient from '../database/prismaClient';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await prismaClient.appointments.findMany();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointment();

    const appointment = await createAppointment.handle({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
