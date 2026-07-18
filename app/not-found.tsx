import type { Metadata } from 'next';
import Link from 'next/link';
import { content } from '@/content/de';

const { notFound } = content.pages;

export const metadata: Metadata = {
  title: notFound.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <div className="not-found-page">
        <h1>{notFound.h1}</h1>
        <p>{notFound.body}</p>
        <Link href="/">{notFound.backLabel}</Link>
      </div>
    </main>
  );
}
