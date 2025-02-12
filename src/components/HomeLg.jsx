import { useState } from "react";
import TicketForm from "./Form";

const HomeLg = () => {
  const [ticketGenerated, setTicketGenerated] = useState(false);
  return (
    <div className="sm:hidden md:flex fixed ms:hidden xs:hidden lg:flex bg-HomeLg-bg ">
      {/* Background Patterns */}
      <div className="h-screen w-screen absolute inset-0 z-0 pointer-events-none">
        <img
          src="./pattern-squiggly-line-top.svg"
          alt="Top Squiggly Line"
          className="absolute top-0 right-0"
        />
        <img
          src="./pattern-lines.svg"
          alt="Pattern Lines"
          className="w-full h-auto"
        />
        <img
          src="./pattern-circle.svg"
          alt="Circle Pattern"
          className="absolute"
        />
        <img
          src="./pattern-squiggly-line-bottom.svg"
          alt="Bottom Squiggly Line"
          className="absolute bottom-0 left-0"
        />
      </div>

      {/* Content Section */}
      <div className="h-screen relative z-10">
        <div className="w-screen items-center flex flex-col justify-center">
          <img src="./logo-full.svg" className="m-10"/>
          <h1 className="text-4xl text-center">Your Journey to Coding Conf <br/> 2025 Starts Here </h1>
          <p className="m-4 text-xl text-gray">Secure your spot at next year&apos;s biggest coding conference</p>
          <TicketForm
            ticketGenerated={ticketGenerated}
            setTicketGenerated={setTicketGenerated} 
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLg;
