'use client';

import Button from './Button';
import Heading from './Heading';
import Loader from './Loader';
import Field from './input/Field';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'store/hooks';
import { EnumAuth, IAuth, IEmailPassword } from 'store/user/user.interface';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Неправильний формат запису')
    .required('Введіть email'),
  password: yup
    .string()
    .min(6, 'Мінімум 6 символів')
    .required('Введіть пароль'),
});

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Неправильний формат запису')
    .required('Введіть email'),
  password: yup
    .string()
    .min(6, 'Мінімум 6 символів')
    .required('Введіть пароль'),
  name: yup.string().max(6, 'Максимум 30 символів').required("Введіть ім'я"),
});

const AuthForm = () => {
  const [formType, setFormType] = useState<EnumAuth>(EnumAuth.Login);
  const [submitError, setSubmitError] = useState('');
  const { isLoading } = useAuth();
  const { login, register } = useActions();
  const {
    register: formRegister,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: yupResolver(
      formType === EnumAuth.Login ? loginSchema : registerSchema,
    ),
  });

  const onChangeFormType = () => {
    formType === EnumAuth.Login
      ? setFormType(EnumAuth.Register)
      : setFormType(EnumAuth.Login);
    reset();
    setSubmitError('');
  };

  const onSubmit: SubmitHandler<IAuth> = async data => {
    console.log(data);
    let result;
    if (formType === EnumAuth.Login) {
      result = (await login(data)) as any;
      if (result.error) {
        setSubmitError(result.payload);
        console.log(submitError);
      } else reset();
    } else {
      result = (await register(data)) as any;
      if (result.error) {
        setSubmitError(result.payload);
        console.log(submitError);
      } else reset();
    }
  };


  return (
    <div>
      {formType === EnumAuth.Login ? (
        <div className="animate-open">
          <Heading className="text-center">Вхід в акаунт</Heading>
          <form className="mt-5 px-7" onSubmit={handleSubmit(onSubmit)}>
            <Field
              label="Email"
              error={
                errors.email?.message ||
                (submitError === 'User not found'
                  ? 'Користувач не знайдений'
                  : undefined)
              }
              {...formRegister('email')}
            />
            <Field
              label="Пароль"
              error={
                errors.password?.message ||
                (submitError === 'Invalid password'
                  ? 'Не вірний пароль'
                  : undefined)
              }
              {...formRegister('password')}
            />
            <div className="flex flex-col items-center">
              <Button
                type="submit"
                variant="auth-button"
                className="w-4/6 mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : 'Увійти'}
              </Button>
              <div className="mt-3 flex">
                <p className="text-white">Немає акаунта?</p>
                <button
                  type="button"
                  onClick={onChangeFormType}
                  className="ml-2 text-purple-400 hover:text-purple-200 transition-colors"
                >
                  Зареэструватись
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="animate-modalOpen">
          <Heading className="text-center">Реэстрація</Heading>
          <form className="mt-5 px-7" onSubmit={handleSubmit(onSubmit)}>
            <Field
              label="Email"
              error={
                errors.email?.message ||
                (submitError === 'User already exists'
                  ? 'Цей email вже зареєстрований'
                  : undefined)
              }
              {...formRegister('email')}
            />
            <Field
              label="Пароль"
              error={errors.password?.message}
              {...formRegister('password')}
            />
            <Field
              label="Ім'я"
              error={errors.name?.message}
              {...formRegister('name')}
            />
            <div className="flex flex-col items-center">
              <Button
                type="submit"
                variant="auth-button"
                className="w-4/6 mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : 'Зареєструватись'}
              </Button>
              <div className="mt-3 flex">
                <p className="text-white">Вже э акаунт?</p>
                <button
                  type="button"
                  onClick={onChangeFormType}
                  className="ml-2 text-purple-400 hover:text-purple-200 transition-colors"
                >
                  Увійти
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <Button variant="auth-button" >
        <Link href={'http://localhost:4200/api/auth/google'}>Google</Link>
      </Button>
    </div>
  );
};

export default AuthForm;
