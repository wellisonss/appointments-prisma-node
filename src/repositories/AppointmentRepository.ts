import { Appointments } from '@prisma/client';
import prismaClient from '../database/prismaClient';

class AppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointments | null> {
    const findAppointment = await prismaClient.appointments.findFirst({
      where: {
        date,
      },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
