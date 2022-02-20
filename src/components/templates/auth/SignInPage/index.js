import Button from '@elements/Button';
import { auth } from '@libs/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignInPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (!user) return;
    router.push('/');
  }, [user]);
  return (
    <div>
      <Button onClick={() => signInWithGoogle()}>Signin with Google</Button>
    </div>
  );
};

export default SignInPage;
