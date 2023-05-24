'use client';

import Button from './Button';
import Heading from './Heading';
import Field from './input/Field';
import { yupResolver } from '@hookform/resolvers/yup';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'store/hooks';
import { EnumAuth, IEmailPassword } from 'store/user/user.interface';
import * as yup from 'yup';

const errors = {
  'User not found': 'Користувач не знайдений',
  'Invalid password': 'Не вірний пароль',
  'User already exists': 'Цей email вже зареєстрований',
};

const authSchema = yup.object({
  email: yup
    .string()
    .email('Неправильний формат запису')
    .required('Введіть email'),
  password: yup
    .string()
    .min(6, 'Мінімум 6 символів')
    .required('Введіть пароль'),
});

const AuthForm = () => {
  const [formType, setFormType] = useState<EnumAuth>(EnumAuth.Login);
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();
  const { login, register } = useActions();
  const {
    register: formRegister,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailPassword>({
    resolver: yupResolver(authSchema),
  });

  const onChangeFormType = () => {
    formType === EnumAuth.Login
      ? setFormType(EnumAuth.Register)
      : setFormType(EnumAuth.Login);
    reset();
  };

  const onSubmit: SubmitHandler<IEmailPassword> = async data => {
    console.log(data);

    if (formType === EnumAuth.Login) login(data);
    else register(data);
    reset();
  };

  return (
    <>
      {formType === EnumAuth.Login ? (
        <div className="animate-open">
          <Heading className="text-center">Вхід в акаунт</Heading>
          <form className="mt-5 px-7" onSubmit={handleSubmit(onSubmit)}>
            <Field
              label="Email"
              error={errors.email?.message}
              {...formRegister('email')}
            />
            <Field
              label="Пароль"
              error={errors.password?.message}
              {...formRegister('password')}
            />
            <div className="flex flex-col items-center">
              <Button
                type="submit"
                variant="auth-button"
                className="w-4/6 mt-2"
              >
                Увійти
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
              error={errors.email?.message}
              {...formRegister('email')}
            />
            <Field
              label="Пароль"
              error={errors.password?.message}
              {...formRegister('password')}
            />
            <div className="flex flex-col items-center">
              <Button
                type="submit"
                variant="auth-button"
                className="w-4/6 mt-2"
              >
                Зареєструватись
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
    </>
  );
};

export default AuthForm;
