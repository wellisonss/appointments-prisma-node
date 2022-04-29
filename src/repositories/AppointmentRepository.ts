import { Appointments } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";


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



// import { isEqual } from 'date-fns';

// import Appointment from '../models/Appointment';

// class AppointmentsRepository {
//   private appointments: Appointment[];

//   public async findByDate(date: Date): Promise<Appointment | null> {
//     const findAppointment = await this.appointments.find(appointments =>
//       isEqual(date, appointments.date),
//     );

//     return findAppointment || null;
//   }
// }

// export default AppointmentsRepository;
