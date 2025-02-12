import { useState } from "react";
import TicketForm from "./Form";

const HomeSm = () => {
    const [ticketGenerated, setTicketGenerated] = useState(false);
  return (
    <div className="lg:hidden fixed md:hidden sm:flex bg-HomeSm-bg">
      <div className="h-screen w-screen absolute inset-0 z-0 pointer-events-none">
        <img
          src="./pattern-squiggly-line-top.svg"
          alt="Top Squiggly Line"
          width={200}
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
          width={200}
          className="absolute bottom-0 left-0"
        />
      </div>

      {/* Logo Section */}
      <div className="h-screen relative z-10">
        <div className="w-screen items-center flex flex-col justify-center">
          <img src="./logo-full.svg" className="sm:m-10 ms:m-10 xs:m-6" />
          {!ticketGenerated && (
            <>
              <h1 className="sm:text-[30px] ms:text-[30px] xs:text-[25px] text-center pr-5 pl-5">
                Your Journey to Coding Conf 2025 Starts Here{" "}
              </h1>
              <p className="m-2 text-xl text-center text-gray pl-5 pr-5">
                Secure your spot at next year&apos;s biggest coding conference
              </p>
            </>
          )}
        </div>{" "}
        <TicketForm
            ticketGenerated={ticketGenerated}
            setTicketGenerated={setTicketGenerated} 
          />
      </div>
    </div>
  );
};

export default HomeSm;
