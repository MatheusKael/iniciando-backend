import { Repository, EntityRepository } from 'typeorm'
import Appointment from '../models/Appointments';


@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {

  public async findByDate(date: Date): Promise<Appointment | null> {

    // const findAppointment = this.appointments.find(appointment => isEqual(date , appointment.date));

    const findAppointment = await this.findOne({
      where : { date }
    })
    return findAppointment || null
  }


}

export default AppointmentRepository;
