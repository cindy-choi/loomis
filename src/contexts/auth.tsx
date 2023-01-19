import { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

type AuthContextProps = {
  loading: boolean;
  user: User | null;
  token?: string;
};

const AuthContext = createContext<AuthContextProps>({ loading: false, user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [authState, setAuthState] = useState<AuthContextProps>({ loading: true, user: null });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const onChange = (user: User | null) => {
    setUser(user);
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(true);

      if (!user) {
        // setAuthState({ loading: false, user: null });
        setUser(null);
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      // setAuthState({ loading: false, user: null, token });
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, loading: loading, authentificated: !!user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthState = () => {
  return useContext(AuthContext);
};
