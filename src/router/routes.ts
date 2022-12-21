export const ROUTES = {
  contacts: "/contacts",
} as const;

export type RootStackNavigation = {
  [ROUTES.contacts]: {};
};
