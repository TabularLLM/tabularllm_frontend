import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";


export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-[20px] left-[30px] text-[#BEBEBE] text-[22px] font-bold">
        TabularLLM
      </div>

      {/* Square and rectangle elements */}
      {/* Left Side */}
      {/* Rectangle on Top */}
      {/* <div 
        className="absolute top-80 border border-gray-300 rounded-md rotate-90"
        style={{ height: '90px', width: '190px', left: '-2%', top: 'calc(150px + 10px)' }}
      ></div> */}
      {/* Rectangle on the Bottom */}
      {/* <div 
        className="absolute border top-20 border-black rounded-md"
        style={{ height: '475px', width: '180px', left: '1%', top: 'calc(300px + 10px)' }}
      ></div> */}

      {/* Right Side Rectangles */}
      {/* Left Rectangle */}
      {/* <div 
        className="absolute top-20 border border-gray-300 rounded-md"
        style={{ height: '90px', width: '250px', left: '74%', top: 'calc(175px + 10px)' }}
      ></div> */}
      {/* Right Rectangle */}
      {/* <div 
        className="absolute border top-20 border-black rounded-md rotate-90"
        style={{ height: '160px', width: '170px', left: '89%', top: 'calc(100px + 10px)' }}
      ></div> */}


      {/* Bottom Middle Rectangle */}
      {/* <div
        className="absolute bottom-10 border border-gray-300 rounded-md transform -translate-x-1/2"
        style={{ height: '90px', width: '1000px', left: '41%' }}
      ></div> */}



      {/* Bottom Right Rectangle */}
      {/* <div 
        className="absolute bottom-10 border border-gray-300 rounded-md transform -translate-x-1/2"
        style={{ height: '500px', width: '260px', left: '91%' }}
      ></div> */}

      <div className="mt-20">
        <h1 className="text-[35px] font-bold leading-tight text-center">
          Welcome
        </h1>
        <div className="mt-2 px-4 py-2 text-[16px] text-center text-[#5E5E5E] max-w-[410px]">
          <p>Turn your data into decisions!</p>
          <p>Unleash powerful insights with AI-driven analysis and stunning visualizations. 📊 ✨ </p>
        </div>
        <div className="flex justify-center">
          <Button className="mt-4 border border-[#BEBEBE] bg-[#F8F9F7] text-[#767676] font-bold text-[16px] hover:text-white" asChild>
            <Link href="/upload">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

