import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full h-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          LLM Game Changer
        </h1>
      </Link>
    </header>
  );
}
