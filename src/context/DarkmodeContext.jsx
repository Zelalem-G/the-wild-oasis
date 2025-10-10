import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { FaLaptopHouse } from "react-icons/fa";

const DarkmodeContext = createContext();

function DarkmodeProvider({ children }) {
  const [isDarkmode, setIsDarkmode] = useLocalStorageState(false, "isDarkmode");

  useEffect(
    function () {
      if (isDarkmode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkmode]
  );

  function toggleDarkmode() {
    setIsDarkmode((mode) => !mode);
  }

  return (
    <DarkmodeContext.Provider value={{ isDarkmode, toggleDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

function useDarkmode() {
  const context = useContext(DarkmodeContext);

  if (context === undefined)
    throw new Error("DarkmodeContext is being used outside the provider");

  return context;
}

export { useDarkmode, DarkmodeProvider };
