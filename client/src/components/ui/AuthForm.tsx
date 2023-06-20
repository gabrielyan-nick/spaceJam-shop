'use client';

import Button from './button/Button';
import Heading from './Heading';
import Loader from './Loader';
import Field from './input/Field';
import { yupResolver } from '@hookform/resolvers/yup';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

interface IAuthForm {
  onClose: () => void;
}

const AuthForm = ({ onClose }: IAuthForm) => {
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
    let result;
    if (formType === EnumAuth.Login) {
      result = (await login(data)) as any;
      if (result.error) {
        setSubmitError(result.payload);
      } else {
        reset();
        onClose();
      }
    } else {
      result = (await register(data)) as any;
      if (result.error) {
        setSubmitError(result.payload);
      } else {
        reset();
        onClose();
      }
    }
  };

  return (
    <div>
      {formType === EnumAuth.Login ? (
        <div className="animate-open">
          <Heading className="text-center">Вхід в акаунт</Heading>
          <form className="mt-5 px-2 sxx:px-7" onSubmit={handleSubmit(onSubmit)}>
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
                variant="auth-btn"
                className="w-4/6 mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : 'Увійти'}
              </Button>
              <div className="mt-4 flex">
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
          <GoogleBtn />
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
                variant="auth-btn"
                className="w-4/6 mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : 'Зареєструватись'}
              </Button>
              <div className="mt-4 flex">
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
          <GoogleBtn />
        </div>
      )}
    </div>
  );
};

export default AuthForm;

const GoogleBtn = () => {
  return (
    <div className="px-2 sxx:px-7 mt-4">
      <Button variant="google-btn" className="w-4/6 m-auto">
        <Link
          className="w-full flex justify-center items-center text-base"
          href={'http://localhost:4200/api/auth/google'}
        >
          Увійти{' '}
          <svg
            width={20}
            height={20}
            className="ml-3 mr-0.5"
            viewBox="-0.5 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <path
                d="M9.827 24c0-1.524.253-2.986.705-4.356l-7.909-6.04A23.456 23.456 0 00.213 24c0 3.737.868 7.26 2.407 10.388l7.905-6.05A13.885 13.885 0 019.827 24"
                fill="#FBBC05"
                transform="translate(-401 -860) translate(401 860)"
              />
              <path
                d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533a23.43 23.43 0 00-21.09 13.071l7.908 6.04a13.849 13.849 0 0113.182-9.51"
                fill="#EB4335"
                transform="translate(-401 -860) translate(401 860)"
              />
              <path
                d="M23.714 37.867a13.849 13.849 0 01-13.182-9.51l-7.909 6.038a23.43 23.43 0 0021.09 13.072c5.732 0 11.205-2.036 15.312-5.849l-7.507-5.804c-2.118 1.335-4.786 2.053-7.804 2.053"
                fill="#34A853"
                transform="translate(-401 -860) translate(401 860)"
              />
              <path
                d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.618"
                fill="#4285F4"
                transform="translate(-401 -860) translate(401 860)"
              />
            </g>
          </svg>
          <span className="translate-y-0.5">oogle</span>
        </Link>
      </Button>
    </div>
  );
};
