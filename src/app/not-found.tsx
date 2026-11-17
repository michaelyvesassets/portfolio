import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-24 sm:px-8 lg:px-14">
      <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold italic tracking-[-0.075em] text-ink">
        Not found<span className="text-accent">.</span>
      </h1>
      <p className="mt-4 text-[17px] text-mute">This page doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-wash px-5 py-2 text-[15px] hover:bg-ink hover:text-white">
        Back home
      </Link>
    </div>
  );
}
