import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 text-center bg-[#F7FBFA]">

      {/* Badge */}
      <span className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-[#2FA084]/10 text-[#2FA084] rounded-full border border-[#2FA084]/20">
        Welcome to your space
      </span>

      {/* Heading */}
      <h1 className="max-w-2xl text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F6F5F] mb-6 leading-tight">
        Time to share your stories.
      </h1>

      {/* Image Subtitle */}
      <div className="mb-10">
        <Image
          src="/home.png"
          alt="Home illustration"
          width={250}
          height={250}
          className="mx-auto rounded-xl"
          priority
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          href="/editor"
          className="flex items-center justify-center px-8 py-3.5 bg-[#1F6F5F] text-white font-medium rounded-xl hover:bg-[#2FA084] transition-all shadow-[0_4px_14px_0_rgba(31,111,95,0.39)] hover:shadow-[0_6px_20px_rgba(47,160,132,0.23)] hover:-translate-y-0.5"
        >
          Start Writing
        </Link>

        <Link
          href="/news"
          className="flex items-center justify-center px-8 py-3.5 bg-white text-[#1F6F5F] font-medium rounded-xl border-2 border-gray-200 hover:border-[#2FA084] hover:text-[#2FA084] transition-all"
        >
          Explore Posts
        </Link>
      </div>

    </div>
  );
}