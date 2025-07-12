import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInpage() {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-sm border border-orange-200">
          <SignIn />
        </div>
        <div className="hidden lg:block w-1/2 pl-12">
          <Image
            src="/teamspirit-pana1.png"
            alt="Team spirit illustration"
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
