'use client';

import { FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import encryptData from '@/actions/encryptData';
import UserError from '@/errors/userError';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoadingApplicationContext } from '../loadingApplicationContext/useContext';
import { useToastContext } from '../toastContext/useContext';
import { zodSchema, BodyProtocol } from './validation';

export default function useFormLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BodyProtocol>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      typeClient: 'Pessoa física',
      idDocument: '',
      password: '',
    },
  });
  const { isLoading, setIsLoading } = useLoadingApplicationContext();
  const { setToast } = useToastContext();

  const handleFormSubmit: SubmitHandler<BodyProtocol> = async body => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const authorization = await encryptData(body);
      const res = await fetch('/api/scrape', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new UserError(data.error.message, 400);
      location.href = `/faturas/${data.userId}`;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err instanceof UserError) {
        setToast({
          open: true,
          severity: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro desconhecido, tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCNPJInput = (event: FormEvent<HTMLInputElement>) => {
    // 12.345.678/0001-95
    const currentTarget = event.currentTarget;
    let value = currentTarget.value;
    value = value.replace(/[^\d]/g, '');
    value = value.slice(0, 14);
    // Aplica a formatação de CNPJ usando regex em etapas
    value = value.replace(/^(\d{2})(\d)/, '$1.$2'); // Formata os dois primeiros dígitos
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Formata os próximos três dígitos
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Formata os próximos três dígitos e adiciona a barra
    value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Formata os quatro dígitos e adiciona o hífen

    currentTarget.value = value;
  };

  const handleCPFInput = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value;
    value = value.replace(/[^\d]/g, '');
    value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    currentTarget.value = value;
  };

  return {
    handleSubmit: handleSubmit(handleFormSubmit),
    register,
    errors,
    setValue,
    handleCPFInput,
    handleCNPJInput,
    watch,
    reset,
  };
}
