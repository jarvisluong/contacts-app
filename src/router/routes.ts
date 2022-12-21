export const ROUTES = {
  contacts: "/contacts",
  contactDetail: "/contacts/detail",
} as const;

export type RootStackNavigation = {
  [ROUTES.contacts]: {};
  [ROUTES.contactDetail]: {
    id: string;
    title: string;
  };
};
