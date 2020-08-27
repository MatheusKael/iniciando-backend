import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  date : Date;
  provider_id : string;
}

class CreateAppointment {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This Date have been already booked');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointment;