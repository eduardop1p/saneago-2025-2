'use client';

import { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';

import { twMerge } from 'tailwind-merge';

import { BodyProtocol } from '@/utils/formLogin/validation';

interface Props {
  className?: string;
  register: UseFormRegister<BodyProtocol>;
  error?: FieldError;
}

export default function InputPassword({ className, register, error }: Props) {
  const [focus, setFocus] = useState(false);
  const [inputType, setInputType] = useState('text');

  return (
    <div className={twMerge(`w-full flex flex-col gap-1 flex-none`, className)}>
      <div
        className={`${error ? 'border-red-500' : focus ? 'border-00649c' : 'border-b4becd'}  relative w-full border border-solid rounded-md h-[57px] bg-transparent transition-colors duration-200`}
      >
        <label
          className={`${error ? 'text-red-500' : focus ? 'text-00649c' : 'text-b4becd'} ${focus ? 'text-xs -top-3' : 'text-base top-1/2 -translate-y-1/2'}  bg-white p-1 absolute z-[5] left-[10px] transition-all duration-200 pointer-events-none`}
        >
          Senha
        </label>
        <input
          type={inputType}
          {...register('password', {
            onBlur(event) {
              const value = event.target.value;
              if (!value) setFocus(false);
            },
          })}
          onFocus={() => setFocus(true)}
          className='w-full h-full px-3 text-base text-black'
        />

        <div className='absolute top-1/2 -translate-y-1/2 right-4 z-[5] w-fit h-6 flex-none'>
          {inputType === 'password' ? (
            <button type='button' onClick={() => setInputType('text')}>
              <MdVisibilityOff size={24} fill='#00649c' />
            </button>
          ) : (
            <button type='button' onClick={() => setInputType('password')}>
              <MdVisibility size={24} fill='#00649c' />
            </button>
          )}
        </div>
      </div>
      {error && (
        <span className='text-red-500 text-[13px] ml-[2px]'>
          {error.message}
        </span>
      )}
    </div>
  );
}
