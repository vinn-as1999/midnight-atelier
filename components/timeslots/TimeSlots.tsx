'use client';

import './timeslots.scss';


const AVAILABLE_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const UNAVAILABLE = ['10:00', '11:00', '15:00'];

type Props = {
  selectedHour: string | null;
  setSelectedHour: (hour: string) => void;
};

export default function TimeSlots({selectedHour, setSelectedHour}: Props) {

  function getSlotClass(hour: string): string {
    if (UNAVAILABLE.includes(hour)) return 'slot unavailable';
    if (selectedHour === hour) return 'slot selected';
    return 'slot';
  }

  return (
    <article className="hours">
      <span className="hours-label">Available times</span>
      <ul className="hours-sheet">
        {AVAILABLE_HOURS.map((hour) => (
          <li
            key={hour}
            className={getSlotClass(hour)}
            onClick={() => {
              if (!UNAVAILABLE.includes(hour)) setSelectedHour(hour);
            }}
          >
            {hour}
          </li>
        ))}
      </ul>
    </article>
  );
}
