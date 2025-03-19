import { RootState } from ".";
import { useAppSelector } from "./hooks";

export default function useAppSelectors<Key extends keyof RootState>(key: Key):RootState[Key]  {  
  return useAppSelector((state) => state[key]); 
}
