import { Dispatch, SetStateAction } from 'react';
import './aside.scss';
import { MdOutlineClose } from 'react-icons/md';
import Link from 'next/link';


export default function Aside({isActived, setIsActived}: {isActived: boolean, setIsActived: Dispatch<SetStateAction<boolean>>}) {
  return (
    <>
      <aside className={isActived ? 'out' : ''}>
        <button className='close' onClick={() => setIsActived(prev => !prev)}>
          <MdOutlineClose />
        </button>

        <span>
          the midnight atelier
        </span>

        <ul className='aside-list'>
            <li>
              <Link href={"#about"}>about</Link>
            </li>
            <li>
              <Link href={"#services"}>services</Link>
            </li> 
            <li>
              <Link href={"#barbers"}>barbers</Link>
            </li>
            <li>
              <Link href={"#contact"}>contact</Link>
            </li>
        </ul>
      </aside>
    </>
  )
};