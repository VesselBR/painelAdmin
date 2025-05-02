import { createContext, useContext } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export function DrawerProvider({ children }) {
  return (
    <DrawerContext.Provider value={{}}>
      {children}
    </DrawerContext.Provider>
  );
}