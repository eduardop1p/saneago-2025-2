'use client';

import { FormEventHandler, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { BodyProtocol } from '@/utils/formLogin/validation';

interface Props {
  className?: string;
  label: string;
  name: keyof BodyProtocol;
  register: UseFormRegister<BodyProtocol>;
  errors: FieldErrors<BodyProtocol>;
  onInput: FormEventHandler<HTMLInputElement>;
}

export default function Input({
  className,
  label,
  register,
  errors,
  onInput,
  name,
}: Props) {
  const [focus, setFocus] = useState(false);
  const error = errors[name];

  return (
    <div className={twMerge(`w-full flex flex-col gap-1 flex-none`, className)}>
      <div
        className={`${error ? 'border-red-500' : focus ? 'border-00649c' : 'border-b4becd'}  relative w-full border border-solid rounded-md h-[57px] bg-transparent transition-colors duration-200`}
      >
        <label
          className={`${error ? 'text-red-500' : focus ? 'text-00649c' : 'text-b4becd'} ${focus ? 'text-xs -top-3' : 'text-base top-1/2 -translate-y-1/2'}  bg-white p-1 absolute z-[5] left-[10px] transition-all duration-200 pointer-events-none`}
        >
          {label}
        </label>
        <input
          type='text'
          {...register(name, {
            onBlur(event) {
              const value = event.target.value;
              if (!value) setFocus(false);
            },
          })}
          onFocus={() => setFocus(true)}
          onInput={onInput}
          className='w-full h-full px-3 text-base text-black'
        />
      </div>
      {error && (
        <span className='text-red-500 text-[13px] ml-[2px]'>
          {error.message}
        </span>
      )}
    </div>
  );
}
