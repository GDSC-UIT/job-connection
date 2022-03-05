import Button from '@elements/Button';
import { auth } from '@libs/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import logo from './login.png';
import icon from './icon.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, _user, _loading, error] = useSignInWithEmailAndPassword(auth);
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (!user) return;
    router.push('/');
  }, [user]);

  const onSubmit = (data) => signInWithEmailAndPassword(data.email, data.password);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="login">
        <div className="login-left">
          <img src={logo.src} alt="" />
        </div>
        <div className="login-right">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <p className="form-title">Login to your account</p>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input placeholder="Your email..." type="email" {...register('email', { required: true })} />
            </div>
            <div className="form-row">
              <label htmlFor="pass">Password</label>
              <input placeholder="Your password..." type="password" {...register('password', { required: true })} />
            </div>
            <div className="form-row form-row-functions">
              <div className="form-row-functions-left">
                {/* <input className="radio" type="radio" name="re" id="re" />
                <div className="form-radio"></div>
                <label htmlFor="re">Remember me</label> */}
              </div>
              <div className="form-row-functions-right">
                <Link href="#" className="form-link">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="form-row form-actions">
              <Button type="submit" loading={formState.isSubmitting}>
                Login now
              </Button>
              <button type="button" onClick={() => signInWithGoogle()}>
                <img src={icon.src} alt="" /> Or sign-in with Google
              </button>
              <div className="form-signup">
                <p className="text-center">
                  {"Don't have an account? "}
                  <Link href="/sign-up">
                    <a className="text-blue-700">Sign up</a>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
