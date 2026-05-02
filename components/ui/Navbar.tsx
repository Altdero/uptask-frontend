import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white px-8 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <Image src="./logo.svg" alt="UpTask" />
      </nav>
    </header>
  );
}
