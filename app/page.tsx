import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { MdFaceUnlock, MdStarBorderPurple500 } from "react-icons/md";
import { PiScissorsLight, PiScroll } from "react-icons/pi";
import Link from "next/link";
import '../styles/home.scss';
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";


export default function Home() {
  return (
    <main className="home-main">
      <nav className="home-navbar">
        <div className="nav-logo">
          <Image src={"/s-logo.png"} alt="TMA Logo"   width={100} height={70} />
        </div>

        <ul className="nav-list">
          <li>about</li>
          <li>services</li>
          <li>barbers</li>
          <li>contact</li>
        </ul>

        <button className="book-bttn">
          <Link href={"/appointment"}>book now</Link>
        </button>
      </nav>

      <section className="main-screen">
        <span className="page-tag">the best</span>

        <h1 className="main-phrase">
          Masters of the Blade
        </h1>

        <div className="icon-container">
          <PiScissorsLight className="icon" />
        </div>

        <p className="main-message">
          Experience the art of grooming in our midnight sanctuary. Precision cuts, tailored beard grooming, and the timeless ritual of a straight razor shave.
        </p>

        <div className="book-app-container">
          <button>
            <Link href={"/appointment"}>book appointment</Link>
          </button>
        </div>
      </section>

      <section className="services-container">
        <article className="services-main-phrase">
          <span className="page-tag">Craftsmanship</span>
          <h1>Elevated Rituals for the Modern Gentleman</h1>
        </article>

        <article className="services-paragraph">
          <p>Each service is more than a cut—it's a curated experience designed to refine your appearance and restore your focus.</p>
        </article>

        <article className="services">
          <ul className="serv-list">
            <li id="hair">
              <MdFaceUnlock className="icon" />
              <h2>Signature Haircut</h2>
              <p>
                Precision tailoring of your hair, followed by a hot towel finish and artisanal styling.
              </p>
              <span>
                $ 55
              </span>
            </li>

            <li id="beard">
              <PiScissorsLight className="icon" />
              <h2>Royal Beard Groom</h2>
              <p>
                Sculpting, lining, and conditioning with premium oils and a straight-edge finish.
              </p>
              <span>
                $ 40
              </span>
            </li>

            <li id="full-atelier">
              <MdStarBorderPurple500 className="icon" />
              <h2>The Full Atelier</h2>
              <p>
                Our master package combining the signature cut, beard groom, and a facial massage.
              </p>
              <span>$ 85</span>
            </li>
          </ul>
        </article>
      </section>

      <section className="barbers">
        <header>
          <span className="page-tag">meet the artisans</span>
          <h2>The Masters</h2>
        </header>

        <ul className="barbers-list">
          <li>
            <article className="barber-img" id="julian" />

            <article className="barber-info">
              <span className="page-tag">lead barber</span>
              <h3>Julian Thorne</h3>
              <p>
                "Grooming is a form of architecture. It's about finding the balance between tradition and the individual's character."
              </p>

              <button>
                <PiScroll className="icon" />
              </button>
            </article>
          </li>

          <li>
            <article className="barber-info">
              <span className="page-tag">master stylist</span>
              <h3>Elias Vance</h3>
              <p>
                "I don't just cut hair; I craft confidence. Every client leaves the chair feeling like the best version of themselves."
              </p>

              <button>
                <PiScroll className="icon" />
              </button>
            </article>

            <article className="barber-img" id="elias" />
          </li>
        </ul>
      </section>

      <section className="about-container">
        <article className="about-img" />

        <button className="about-bttn">
          <Link href={"/appointment"}>book appointment</Link>
        </button>

        <article className="about-text">
          <header>
            <span className="page-tag">Born of Precision</span>
            <h2>About Us</h2>
          </header>

          <div className="text">
            <p>
              Founded on the belief that grooming is an art form rather than a routine, this barbershop was born in the heart of an old urban district, where tradition meets quiet sophistication. What began as a modest chair and a pair of skilled hands has evolved into a refined space dedicated to precision, presence, and personal expression.
            </p>
            <p>
              Every detail, from the curated ambiance to the meticulous craftsmanship of each cut, reflects a commitment to timeless elegance. Here, style is not merely delivered—it is carefully sculpted, ensuring every client leaves with a sense of distinction and understated confidence.
            </p>
          </div>

          <div className="reviews">
            <span className="number">4.9</span>
            <span className="stars">
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStarHalf />
            </span>
          </div>

          <div className="network">
            <FaInstagram />
            <FaWhatsapp />
            <FaFacebookF />
            <IoLocationOutline />
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
