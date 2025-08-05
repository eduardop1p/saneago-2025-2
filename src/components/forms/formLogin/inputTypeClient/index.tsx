'use client';

import { useEffect, useRef, useState } from 'react';
import { UseFormReset, UseFormSetValue } from 'react-hook-form';
import { IoMdArrowDropdown } from 'react-icons/io';

import { twMerge } from 'tailwind-merge';

import { BodyProtocol } from '@/utils/formLogin/validation';

interface Props {
  className?: string;
  setValue: UseFormSetValue<BodyProtocol>;
  currentValue: string;
  reset: UseFormReset<BodyProtocol>;
}

export default function InputTypeClient({
  className,
  setValue,
  currentValue,
  reset,
}: Props) {
  const [showSelect, setShowSelect] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  const options = ['Pessoa física', 'Pessoa jurídica'];

  const handleClose = () => {
    setShowSelect(false);
  };

  useEffect(() => {
    const onmousedown = (event: Event) => {
      const elementTarget = event.target as HTMLElement;
      if (container.current && !container.current.contains(elementTarget)) {
        handleClose();
      }
    };

    window.addEventListener('mousedown', onmousedown);
    return () => {
      window.removeEventListener('mousedown', onmousedown);
    };
  }, []);

  const handleClick = (optionValue: string) => {
    setValue('typeClient', optionValue);
    setShowSelect(false);
    reset(values => ({ ...values, idDocument: '', password: '' }));
  };

  return (
    <div
      className={twMerge(
        `${showSelect ? 'border-00649c' : 'border-b4becd'} flex-none relative w-full border border-solid rounded-md h-[57px] bg-transparent transition-colors duration-200`,
        className
      )}
      ref={container}
    >
      <label
        className={`${showSelect ? 'text-00649c' : 'text-64748b'} text-xs bg-white p-1 absolute z-[5] -top-3 left-[10px] transition-colors duration-200`}
      >
        Tipo de cliente
      </label>
      <button
        type='button'
        className='w-full h-full flex items-center justify-between px-3'
        onClick={() => setShowSelect(!showSelect)}
      >
        <span className='text-black text-base'>{currentValue}</span>
        <IoMdArrowDropdown
          size={19}
          fill='#00649c'
          className={`${showSelect ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
        />
      </button>

      <div
        className={`${showSelect ? 'translate-y-0 opacity-100 visible' : 'translate-y-[20px] opacity-0 invisible'} absolute z-10 top-[60px] left-0 w-full shadow-card-login border-gray-300 border border-solid bg-white rounded-md overflow-hidden transition-all duration-200`}
      >
        {options.map((item, i) => (
          <button
            key={i}
            type='button'
            onClick={() => handleClick(item)}
            className={`${item.toLowerCase() === currentValue.toLowerCase() ? 'bg-f5f5f5' : 'bg-inherit'} text-base text-black w-full h-12 px-3 flex items-center flex-none hover:bg-f5f5f5 transition-colors duration-200`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
