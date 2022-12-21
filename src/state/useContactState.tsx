import {
  useContext,
  useReducer,
  createContext,
  PropsWithChildren,
  Reducer,
  Dispatch,
  useCallback,
} from "react";

export type Contact = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  addresses?: string;
  birthDate?: string;
  id: string;
};

type ContactState = {
  contacts: Contact[];
  favoriteContactId?: string;
};

type AddContactAction = { type: "addContacts"; payload: Contact[] };
type SetFavoriteContact = { type: "setFavorite"; payload: string };

type Actions = AddContactAction | SetFavoriteContact;

const initialContactState: ContactState = {
  contacts: [],
  favoriteContactId: undefined,
};

const ContactContext = createContext<
  { state: ContactState; dispatch: Dispatch<Actions> } | undefined
>(undefined);

const contactReducer: Reducer<ContactState, Actions> = (prevState, action) => {
  switch (action.type) {
    case "addContacts":
      return {
        ...prevState,
        contacts: [...prevState.contacts, ...action.payload],
      };
    case "setFavorite":
      return {
        ...prevState,
        favoriteContactId: action.payload,
      };
    default:
      return prevState;
  }
};

export function ContactProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
}

function useContactContext() {
  const value = useContext(ContactContext);
  if (!value) {
    throw new Error("ContactProvider is not in the render scope");
  }
  return value;
}

export function useContacts() {
  const { state } = useContactContext();
  return state;
}

export function useAddContactsAction() {
  const { dispatch } = useContactContext();
  return useCallback(
    (contacts: Contact[]) => {
      dispatch({
        type: "addContacts",
        payload: contacts,
      });
    },
    [dispatch]
  );
}

export function useSetFavoriteAction() {
  const { dispatch } = useContactContext();
  return useCallback(
    (favoriteContactId: string) => {
      dispatch({
        type: "setFavorite",
        payload: favoriteContactId,
      });
    },
    [dispatch]
  );
}
