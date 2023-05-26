'use client';

import AuthForm from './AuthForm';
import Button from './Button';
import UserWidget from './UserWidget';
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
    <UserWidget />
  ) : (
    <>
      <Button variant="auth-btn" onClick={onOpenModal}>
        Увійти
      </Button>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AuthForm  onClose={onCloseModal}/>
      </Modal>
    </>
  );
};

export default AuthButton;
