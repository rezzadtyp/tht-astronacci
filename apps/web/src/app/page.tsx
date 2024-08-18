import { Footer } from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="container">
      <Header />
      <div>Home</div>
      <h1 className="text-3xl font-bold text-red-400 underline">
        Hello, Next.js!
      </h1>
      <Footer />
    </main>
  );
}
