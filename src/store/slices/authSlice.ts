import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthView } from '../../types/auth';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  authView: AuthView;
  recoverySentEmail: string | null;
}

const defaultUser: User = {
  id: 'usr-1',
  name: 'Priya Patel',
  email: 'priya.p@vanguardcrm.in',
  role: 'Senior Enterprise AE',
  company: 'Vanguard Systems India',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
};

const loadAuthFromStorage = (): { user: User | null; isAuth: boolean } => {
  try {
    const savedUser = localStorage.getItem('crm_user');
    const isAuth = localStorage.getItem('crm_is_auth');
    if (savedUser && isAuth === 'true') {
      return { user: JSON.parse(savedUser), isAuth: true };
    }
  } catch (e) {
    console.error('Failed to parse auth from storage', e);
  }
  return { user: defaultUser, isAuth: true };
};

const savedAuth = loadAuthFromStorage();

const initialState: AuthState = {
  currentUser: savedAuth.user,
  isAuthenticated: savedAuth.isAuth,
  authView: 'login',
  recoverySentEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name?: string; role?: string; company?: string }>) => {
      const email = action.payload.email.trim();
      const name = action.payload.name || (email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
      const user: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        role: action.payload.role || 'Enterprise Sales Lead',
        company: action.payload.company || 'Enterprise Partner',
        avatar:
          email === defaultUser.email
            ? defaultUser.avatar
            : `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      };
      state.currentUser = user;
      state.isAuthenticated = true;
      state.recoverySentEmail = null;
      localStorage.setItem('crm_user', JSON.stringify(user));
      localStorage.setItem('crm_is_auth', 'true');
    },
    signup: (state, action: PayloadAction<{ name: string; email: string; role: string; company: string }>) => {
      const user: User = {
        id: `usr-${Date.now()}`,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        company: action.payload.company,
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80`,
      };
      state.currentUser = user;
      state.isAuthenticated = true;
      state.recoverySentEmail = null;
      localStorage.setItem('crm_user', JSON.stringify(user));
      localStorage.setItem('crm_is_auth', 'true');
    },
    forgotPassword: (state, action: PayloadAction<string>) => {
      state.recoverySentEmail = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.authView = 'login';
      state.recoverySentEmail = null;
      localStorage.removeItem('crm_is_auth');
    },
    setAuthView: (state, action: PayloadAction<AuthView>) => {
      state.authView = action.payload;
    },
    clearRecoveryStatus: (state) => {
      state.recoverySentEmail = null;
    },
  },
});

export const {
  login,
  signup,
  forgotPassword,
  logout,
  setAuthView,
  clearRecoveryStatus,
} = authSlice.actions;

export default authSlice.reducer;

