import { startOfHour, parseISO } from "date-fns";

import { prismaClient } from "../database/prismaClient";
import AppointmentsRepository from "../repositories/AppointmentRepository";

interface Request {
  provider: string;
  date: Date;
}


export class CreateAppointment {
  async handle({ date, provider }: Request) {
    const appointmentsRepository = new AppointmentsRepository();

    const hora = startOfHour(date);

    const findAppointmentInSameDate = appointmentsRepository.findByDate(hora);

    if (await findAppointmentInSameDate) {
      throw Error('Error: time conflict');
       }
    
    const appointment = await prismaClient.appointments.create({
      data: {
        provider,
        date: hora,
      },
    });    

    return appointment;
  }
}

// const findAppointmentInSameDate =
//       appointmentsRepository.findByDate(appointmentDate);

//     if (await findAppointmentInSameDate) {
//       throw Error('Error: time conflict');
//     }