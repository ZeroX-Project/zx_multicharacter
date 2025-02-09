import { FC } from 'react';

export const SubmitInput: FC = () => {
  return (
    <input
      type="submit"
      value="Submit"
      className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-sky-300 bg-sky-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-sky-400 hover:bg-opacity-45"
    />
  );
};
