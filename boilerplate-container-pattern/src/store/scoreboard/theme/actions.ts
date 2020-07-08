// ------------------------------------------------------ //
// Actions

export const TOGGLE = "theme/toggle";

// ------------------------------------------------------ //
// Action Creators

export const toggle = (): ThemeActions => ({
  type: "theme/toggle",
});

// ------------------------------------------------------ //
// Types - action

interface Toggle {
  type: typeof TOGGLE;
}

export type ThemeActions = Toggle | { type: undefined };

// ------------------------------------------------------ //
// Types - state

export interface ThemeState {
  isLightMode: boolean;
}
