import Fade from './Fade';
import { FaHand, FaTrash } from 'react-icons/fa6';
import { Locale } from '../../store/locale';

export default function Dialog({ show, handleDialog }: { show: boolean; handleDialog?: any }) {
  return (
    <Fade in={show}>
      <div className="absolute left-[50%] top-[50%] z-20 h-screen w-screen translate-x-[-50%] translate-y-[-50%] bg-gray-900/50">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-[500px] text-lg text-neutral-50">
            <div className="mb-5 rounded border border-sky-300 bg-sky-300 bg-opacity-45 p-3">
              <h1 className="mb-2 text-yellow-200">{Locale.dialog_warn || 'WARNING!!!'}</h1>
              <hr />
              <div className="my-5">
                <p>{Locale.dialog_title || 'Are you sure you want to delete this character?'}</p>
                <p className="text-base">
                  {Locale.dialog_subtitle || 'By deleting this character, all the wealth in this character will disappear.'}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-between gap-10">
              <button
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-red-300 bg-red-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-red-400 hover:bg-opacity-45"
                id={'yes'}
                onClick={() => handleDialog('yes')}
              >
                <FaTrash /> {Locale.dialog_yes || 'Yes, Delete'}
              </button>
              <button
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-sky-300 bg-sky-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-sky-400 hover:bg-opacity-45"
                id={'no'}
                onClick={() => handleDialog('no')}
              >
                <FaHand /> {Locale.dialog_no || "No, Don't Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
