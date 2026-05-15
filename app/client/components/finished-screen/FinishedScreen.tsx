import { RiHome9Line } from 'react-icons/ri';
import './finishedscreen.scss';
import { IoLocationOutline } from 'react-icons/io5';
import AppointmentCard from '../cards/apptm-card/AppointmentCard';
import Link from 'next/link';

export default function FinishedScreen() {
  return (
    <>
      <section className="finished-container">
        <header>
          <h1>We meet soon...</h1>
        </header>
        <p>
          Your seat at the Atelier is reserved. A reminder will follow on the day of your visit.
        </p>
        
        <div className='bttn-container'>
          <button>
            <Link href={"/"}>
              <RiHome9Line /> return to home
            </Link>
          </button>
        </div>
        
        <div className='finish-div'>
          <span>
            directions
          </span>
          <p><IoLocationOutline /> View Location</p>
        </div>

        <div className='apptm-card-container'>
          <AppointmentCard />
        </div>
      </section>
    </>
  )
};
