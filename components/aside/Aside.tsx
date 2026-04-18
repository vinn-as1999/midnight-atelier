import { Dispatch, SetStateAction } from 'react';
import './aside.scss';
import { MdOutlineClose } from 'react-icons/md';


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
          <li>about</li>
          <li>services</li> 
          <li>barbers</li>
          <li>contact</li>
        </ul>
      </aside>
    </>
  )
};