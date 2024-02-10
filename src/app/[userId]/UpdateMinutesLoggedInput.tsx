'use client';
import { ChangeEventHandler, useState } from 'react';

type UpdateMinutesLoggedInputProps = {
  startingValue: number;
  onSubmit: (_val: number) => Promise<void>;
};

export default function UpdateMinutesLoggedInput({ onSubmit, startingValue }: UpdateMinutesLoggedInputProps) {
  const [value, setValue] = useState(startingValue);
  const [loading, setLoading] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const intValue = parseInt(e.target.value);
    if (!isNaN(intValue)) {
      setValue(intValue);
    } else {
      // @ts-ignore, handled via disabling input
      setValue('');
    }
  };

  async function submitUpdate() {
    setLoading(true);
    try {
      await onSubmit(value);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-between content-center flex-col h-32">
      <input
        className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="number"
        min={0}
        onChange={handleChange}
        value={value}
      />
      <button
        disabled={!(value > 0) || loading}
        onClick={submitUpdate}
        className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 disabled:bg-slate-500"
      >
        Update Minutes Logged
      </button>
    </div>
  );
}
