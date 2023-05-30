import React from "react";
import { Dispatch, SetStateAction, createContext, useState } from "react";

// Define the type of the context data
// type MyContextType = {
//   trackData: Array<string>;
//   setTrackData: Dispatch<SetStateAction<string[]>>;
// };

interface TrackData {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
};

type MyContextType = {
  trackData: TrackData[];
  setTrackData: Dispatch<SetStateAction<TrackData[]>>;
};

// Create a new context with the initial state
const MyContext = createContext<MyContextType>({
  trackData: [],
  setTrackData: () => {},
});

// Define the props for the context component
type MyContextProviderProps = {
  children: React.ReactNode;
};

// Define the context component
export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}: MyContextProviderProps) => {
  // Define the state for the context component
  // const [trackData, setTrackData] = useState<string[]>([]);

  const [trackData, setTrackData] = useState<TrackData[]>([]);

  

  // Create the context trackData object
  const contexttrackData: MyContextType = {
    trackData,
    setTrackData,
  };

  // Return the context provider with the context trackData and children components
  return (
    <MyContext.Provider value={contexttrackData}>{children}</MyContext.Provider>
  );
};

// Define a custom hook to use the context trackData in child components
export const useMyContext = () => {
  const { trackData, setTrackData } = React.useContext(MyContext);
  return { trackData, setTrackData };
};
