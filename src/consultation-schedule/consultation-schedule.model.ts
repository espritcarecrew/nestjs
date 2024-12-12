export class consultationScheduleModel {
  id: string;
  doctorId: string;
  day: string;  // Jour de la semaine, ex: "Monday", "Tuesday"
  morningTimes: string[];  // Liste des horaires du matin
  eveningTimes: string[];  // Liste des horaires du soir
}