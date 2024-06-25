import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Create a context with initial values for currentUser, token,
// setUser, setToken functions
const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// Context provider component to manage state and provide context values
export const AuthentContext = ({ children }) => {
  // State variables for user, token initialized from sessionStorage
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("ACCESS_USER"))
  );
  const [token, setToken] = useState(() =>
    sessionStorage.getItem("ACCESS_TOKEN")
  );

  // Memoized versions of setUser, setToken functions
  const memoizedSetUser = useMemo(() => {
    return (user) => {
      setUser(user);
      if (user) {
        sessionStorage.setItem("ACCESS_USER", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("ACCESS_USER");
      }
    };
  }, []);

  const memoizedSetToken = useMemo(() => {
    return (token) => {
      setToken(token);
      if (token) {
        sessionStorage.setItem("ACCESS_TOKEN", token);
      } else {
        sessionStorage.removeItem("ACCESS_TOKEN");
      }
    };
  }, []);

  // Effect to clear sessionStorage after 4 hours (session timeout)
  useEffect(() => {
    const sessionTimeout = setTimeout(() => {
      sessionStorage.clear();
    }, 4 * 60 * 60 * 1000);

    return () => clearTimeout(sessionTimeout);
  }, []);

  // Provide state values and memoized update functions to the context
  return (
    <StateContext.Provider
      value={{
        user,
        setUser: memoizedSetUser,
        token,
        setToken: memoizedSetToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access context values in functional components
export const useAuthentContext = () => useContext(AuthentContext);
