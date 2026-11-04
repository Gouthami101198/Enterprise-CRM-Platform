import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lead, Deal, Customer, Task } from '../../types/crm';

export type NavigationTab = 'dashboard' | 'leads' | 'pipeline' | 'customers' | 'tasks' | 'activities';

export type ModalType =
  | 'new-lead'
  | 'edit-lead'
  | 'convert-lead'
  | 'new-deal'
  | 'edit-deal'
  | 'new-customer'
  | 'edit-customer'
  | 'new-task'
  | 'edit-task'
  | 'log-activity'
  | null;

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

export type ThemeMode = 'light' | 'dark';

interface UIState {
  activeTab: NavigationTab;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  activeModal: ModalType;
  modalData: {
    lead?: Lead;
    deal?: Deal;
    customer?: Customer;
    task?: Task;
    defaultEntity?: {
      type: 'Lead' | 'Deal' | 'Customer';
      id: string;
      name: string;
    };
  } | null;
  toasts: ToastMessage[];
  globalSearch: string;
  theme: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  try {
    const saved = localStorage.getItem('crm_theme');
    if (saved === 'dark' || saved === 'light') {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', saved === 'dark');
      }
      return saved;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('dark');
      }
      return 'dark';
    }
  } catch (e) {
    console.error('Failed to get initial theme', e);
  }
  return 'light';
};

const initialTheme = getInitialTheme();

const initialState: UIState = {
  activeTab: 'dashboard',
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  activeModal: null,
  modalData: null,
  toasts: [],
  globalSearch: '',
  theme: initialTheme,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NavigationTab>) => {
      state.activeTab = action.payload;
      state.mobileMenuOpen = false;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      }
      localStorage.setItem('crm_theme', state.theme);
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      }
      localStorage.setItem('crm_theme', state.theme);
    },
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; data?: UIState['modalData'] }>
    ) => {
      state.activeModal = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
    addToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      const newToast: ToastMessage = {
        ...action.payload,
        id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      };
      state.toasts.push(newToast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    setGlobalSearch: (state, action: PayloadAction<string>) => {
      state.globalSearch = action.payload;
    },
  },
});

export const {
  setActiveTab,
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleTheme,
  setTheme,
  openModal,
  closeModal,
  addToast,
  removeToast,
  setGlobalSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
