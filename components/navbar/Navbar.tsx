import Image from "next/image";
import Link from "next/link";
import './navbar.scss';
import { HiBars3 } from "react-icons/hi2";
import { Dispatch, SetStateAction } from "react";


export default function Navbar({ setIsActived }: { setIsActived: Dispatch<SetStateAction<boolean>> }) {
  return (
    <>
      <nav className="home-navbar">
        <div className="nav-logo">
          <Image src={"/s-logo.png"} alt="TMA Logo" width={100} height={70} />
        </div>

        <button onClick={() => setIsActived(prev => !prev)} className="bars-container">
          <HiBars3 color="icon" />
        </button>

        <ul className="nav-list">
            <li><Link href={"#about"}>about</Link></li>
            <li><Link href={"#services"}>services</Link></li>
            <li><Link href={"#barbers"}>barbers</Link></li>
            <li><Link href={"#contact"}>contact</Link></li>
        </ul>

        <button className="book-bttn">
          <Link href={"/appointment"}>book now</Link>
        </button>

      </nav>
    </>
  )
};