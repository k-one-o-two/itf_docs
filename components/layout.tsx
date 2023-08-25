import Link from 'next/link';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="card">
        <Link href="/">To start</Link>
      </div>
      <div className="card">{children}</div>
    </>
  );
}
