import NavMenu from "@/components/ui/NavMenu";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-gray-800 py-5">
      <div className="flex items-center justify-between pr-4">
        <Link href="/" target="_self">
          <Image
            src="/logo.svg"
            width={250}
            height={88}
            alt="UpTask"
            loading="eager"
          />
        </Link>
        <NavMenu />
      </div>
    </header>
  );
}
