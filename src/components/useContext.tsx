import { useMyContext } from '../context/context';

export const useContext = () => {
  const { trackData, setTrackData } = useMyContext();
  return {trackData,setTrackData};
};
