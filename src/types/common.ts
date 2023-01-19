export type TaskProps = {
  title: string;
  description?: string;
  project: string;
  dueDate?: Date | string;
  isCompleted: 'TODO' | 'DONE';
  archive: boolean;
};

export type EventProps = {
  title: string;
  description?: string;
  date: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  repeat?: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  until?: Date | string;
  repeatId?: string;
  archive: boolean;
};

export default { TaskProps, EventProps };
