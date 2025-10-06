
import { createContext, useState, useEffect } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

type AuthProps = {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthProps>({
  isAuth: false,
  setIsAuth: () => {}
});

const AuthProvider = ({ children }: ChildrenProps) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
