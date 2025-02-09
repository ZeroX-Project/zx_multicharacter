import React, { useState } from 'react';
import { CharacterInfoProp, PlayerDataProp } from '../typings';
import { FaPaperPlane, FaPlus, FaTrash, FaUser } from 'react-icons/fa6';
import { PlayerInfo } from './PlayerInfo';
import { useAppSelector } from '../store';
import { selectConfig } from '../store/config';
import { fetchNui } from '../utils/fetchNui';
import { Locale } from '../store/locale';
import { cn } from '../utils/misc';
import Dialog from './utils/Dialog';

export const CharacterSelect: React.FC<{ playerData: PlayerDataProp | undefined }> = ({ playerData }) => {
  const config = useAppSelector(selectConfig);
  const [activePlayer, setActivePlayer] = useState<CharacterInfoProp | null>(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  if (!activePlayer) {
    playerData?.characters.map((c, i) => {
      if (i == 0) {
        setActivePlayer(c);
      }
      const count = Math.floor(config.maxCharacter - playerData.characters.length);
      setCharacterCount(count);
    });
  }

  function characterHandler(e: any, player: CharacterInfoProp): void {
    setActivePlayer(player);
    fetchNui('swapCharacter', activePlayer);
  }

  function createCharacterHandler(e: any) {
    e.preventDefault();
    fetchNui('createNewCharacter', activePlayer?.citizenid);
  }

  function handleSpawn(e: any, character: CharacterInfoProp): void {
    e.preventDefault();
    fetchNui('spawnCharacter', character);
  }

  function handleDelete(e: any) {
    e.preventDefault();
    setShowDialog(true);
  }

  function handleDialog(e: any) {
    if (e === 'no') {
      setShowDialog(false);
    }
    fetchNui('deleteCharacter', activePlayer);
  }

  return (
    <>
      <Dialog show={showDialog} handleDialog={handleDialog} />
      <div className="absolute right-[5%] text-neutral-50">
        <div className="flex h-screen flex-col items-center justify-center gap-5">
          <div className="flex w-full items-center justify-start gap-10">
            {playerData?.characters.map((c, i) => (
              <button
                key={c.citizenid}
                className={cn(
                  `flex h-10 w-10 items-center justify-center rounded-md border border-sky-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-sky-400 hover:bg-opacity-45 ${activePlayer?.citizenid == c.citizenid ? 'bg-sky-500' : 'bg-sky-300'}`
                )}
                onClick={(e) => characterHandler(e, c)}
              >
                <FaUser />
              </button>
            ))}
            {playerData?.characters &&
              playerData.characters.length < config.maxCharacter &&
              Array.from(Array(characterCount), (e, arrayIndex) => (
                <button
                  key={arrayIndex}
                  className="custom-background flex h-10 w-10 items-center justify-center rounded-md border p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-sky-400 hover:bg-opacity-45"
                  onClick={(e) => createCharacterHandler(e)}
                >
                  <FaPlus />
                </button>
              ))}
          </div>
          {activePlayer && (
            <div>
              <PlayerInfo characterData={activePlayer} />
              <div className="flex items-center justify-center gap-5">
                <button
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-sky-300 bg-sky-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-sky-400 hover:bg-opacity-45"
                  onClick={(e) => handleSpawn(e, activePlayer)}
                >
                  <FaPaperPlane /> {Locale.spawn || 'Spawn'}
                </button>
                {config.enableDeleteButton && (
                  <button
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-red-300 bg-red-300 bg-opacity-45 p-2 text-center align-middle backdrop-filter transition-all duration-100 ease-in-out hover:bg-red-400 hover:bg-opacity-45"
                    onClick={(e) => handleDelete(e)}
                  >
                    <FaTrash /> {Locale.delete || 'Delete'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
