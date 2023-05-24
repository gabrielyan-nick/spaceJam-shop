'use client';

import AuthForm from './AuthForm';
import Button from './Button';
import Modal from './modal/Modal';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';

const AuthButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return user ? (
    <div className="w-10 h-10 rounded-full border-2 border-logoText"></div>
  ) : (
    <>
      <Button variant="auth-button" onClick={onOpenModal}>
        Увійти
      </Button>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AuthForm />
      </Modal>
    </>
  );
};

export default AuthButton;
