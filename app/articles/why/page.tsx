import Link from 'next/link';

export default function Why() {
  return (
    <>
      <h1>#почему_финляндия</h1>
      <ul>
        <li>
          <Link href="why/sisu">sisu</Link>
        </li>
        <li>
          <Link href="why/open">Финляндия открытая страна</Link>
        </li>
      </ul>
    </>
  );
}
