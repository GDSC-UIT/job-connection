import React, { useState, useEffect } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import icon from './icon.png';
import { auth } from '@libs/firebase';
import { useForm } from 'react-hook-form';
import Button from '@elements/Button';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, _user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const { register, formState, handleSubmit } = useForm();

  useEffect(() => {
    if (!user) return;
    router.push('/');
  }, [user]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);
  const onSubmit = (data) => createUserWithEmailAndPassword(data.email, data.password);

  const setPhoneHandler = (phone) => {
    setPhone(phone);
  };
  const setFlagHandler = (flag) => {
    setFlag(flag);
  };
  const mailRegisterHandler = (e) => {
    e.preventDefault();
    setIsSettingUp(true);
  };
  return (
    <div className="flex items-center jusitfy-center h-screen">
      <div className="register">
        <div className="register-main">
          <div className="register-row">
            <p className="register-title">Get your free account</p>
          </div>
          <div className="register-row">
            <button className="register-gg" type="button" onClick={() => signInWithGoogle()}>
              <img src={icon.src} alt="" /> Or sign-in with Google
            </button>
          </div>
          <div className="register-row">
            <div className="register-or">
              <div className="register-or-text">Or</div>
            </div>
          </div>
          <div className="register-row">
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
              <input type="email" placeholder="Email" {...register('email', { required: true })} />
              <input type="password" className="mt-4" placeholder="Password" {...register('password', { required: true })} />
              <Button loading={formState.isSubmitting} type="submit">
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
