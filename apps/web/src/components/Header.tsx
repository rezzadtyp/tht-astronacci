'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <h1
            className="cursor-pointer text-xl font-bold"
            onClick={() => router.push('/')}
          >
            Logo
          </h1>

          <div className="flex cursor-pointer items-center gap-8 font-medium">
            {session.data?.user.id ? (
              <>
                <Link href="/profile">{session.data.user.name}</Link>
                <h3 onClick={() => signOut()}>Logout</h3>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
