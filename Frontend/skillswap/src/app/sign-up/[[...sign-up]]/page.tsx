import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpage() {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
          <SignUp />
        </div>
        <div className="hidden lg:block w-1/2 pl-12">
          <Image
            src="/teamwork-pana.png"
            alt="Team collaboration illustration"
            width={600}
            height={600}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
