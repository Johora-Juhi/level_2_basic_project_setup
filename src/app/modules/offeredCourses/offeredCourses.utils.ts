import { TSchedule } from "./offeredCourses.interface";

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule
) => {
  // for each e kono return korleo loop break hoi navigator, tai for of or normal for loop
  for (const schedule of assignedSchedules) {
    const assignedStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const assignedEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < assignedStartTime && newEndTime > assignedEndTime) {
      return true;
    }
  }
  return false;
};
