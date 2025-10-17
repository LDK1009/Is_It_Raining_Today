import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  name: string
  setName: (name: string) => void
}

export const useUserStore = create<StoreType>((set) => ({
  name: '',
  setName: (name) => set({ name }),
}))
