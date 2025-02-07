import { FC } from 'react';

export const SubmitInput: FC = () => {
  return (
    <input
      type="submit"
      value="Submit"
      className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-sky-300 bg-sky-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter hover:bg-sky-400/40"
    />
  );
};
