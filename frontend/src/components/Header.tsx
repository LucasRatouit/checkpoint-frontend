import Link from "next/link";

export default function Header() {
  return (
    <header className="h-full w-full flex justify-center items-center">
      <h1 className="text-blue-400 text-3xl">Checkpoint : frontend</h1>
      <Link href="/">Countries</Link>
    </header>
  );
}
