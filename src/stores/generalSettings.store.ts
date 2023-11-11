import { create, UseBoundStore, StoreApi } from 'zustand';

import { ColorSchemeEnum } from '../models/generalSettings.models';

interface GeneralSettingsStore {
  colorScheme: ColorSchemeEnum,
  setColorScheme: (newColorScheme: ColorSchemeEnum) => void
}

export const useGeneralSettingStore: UseBoundStore<StoreApi<GeneralSettingsStore>> = create((set) => ({
  colorScheme: ColorSchemeEnum.LIGHT,
  setColorScheme: (newColorScheme: ColorSchemeEnum) => {
    set({colorScheme: newColorScheme})
  },
}))