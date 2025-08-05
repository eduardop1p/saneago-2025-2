'use client';

import { twMerge } from 'tailwind-merge';

import useFormLogin from '@/utils/formLogin/useFormLogin';

import Input from './input';
import InputPassword from './inputPassword';
import InputTypeClient from './inputTypeClient';

interface Props {
  className?: string;
}

export default function FormLogin({ className }: Props) {
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    handleCPFInput,
    handleCNPJInput,
    watch,
    reset,
  } = useFormLogin();
  const typeClientValue = watch('typeClient');

  return (
    <form
      className={twMerge(
        'w-full max-w-[504px] mx-auto bg-white shadow-card-login p-4 rounded-[8px] flex flex-col',
        className
      )}
      onSubmit={handleSubmit}
    >
      <h1 className='text-00649c font-extrabold text-xl mb-5'>Login</h1>
      <InputTypeClient
        setValue={setValue}
        currentValue={typeClientValue}
        reset={reset}
        className='mb-5'
      />
      {typeClientValue.toLowerCase() === 'pessoa física' ? (
        <Input
          label='CPF'
          register={register}
          errors={errors}
          onInput={handleCPFInput}
          name='idDocument'
          className='mb-5'
        />
      ) : (
        <Input
          label='CNPJ'
          register={register}
          errors={errors}
          onInput={handleCNPJInput}
          name='idDocument'
          className='mb-5'
        />
      )}
      <InputPassword
        register={register}
        error={errors.password}
        className='mb-5'
      />
      <div className='w-full grid grid-cols-2 items-center gap-3 mb-4'>
        <button
          type='submit'
          className='flex items-center justify-center text-white bg-00649c rounded-xl h-[52px] font-medium text-sm'
        >
          Entrar
        </button>
        <button
          type='button'
          className='flex items-center justify-center text-00649c border-00649c border border-solid bg-white rounded-xl h-[52px] font-medium text-sm'
          onClick={() => reset()}
        >
          Limpar
        </button>
      </div>
      <p className='text-sm font-bold text-00649c text-center'>
        Esqueci minha senha
      </p>
    </form>
  );
}
