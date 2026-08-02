import type { Metadata } from "next";
import FlipPhone from "../components/FlipPhone";
import Scramble from "../components/Scramble";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="wrap contact-only">
      <div className="contact-head">
        <Scramble text="CONTACT" />
        <h1>Let&apos;s keep in touch! ‧₊˚ ☎︎彡</h1>
      </div>

      <div className="deskmat">
        <span className="mat-label" aria-hidden="true">
          PLEASE LEAVE A MESSAGE
        </span>

        <FlipPhone />

        <div className="sticky" aria-hidden="true">
          <b>Booked</b>
          <span>and somewhat busy</span>
          <span>(not really)</span>
        </div>
      </div>
    </div>
  );
}