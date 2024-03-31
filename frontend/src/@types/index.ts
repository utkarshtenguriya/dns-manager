export interface ModalInitialStateInfr {
  toggle: boolean;
  target: "SIGNIN" | "SIGNUP" | "";
}

export interface UserI {
  email: string;
  isLoggedIn: boolean;
}
export interface AppStore {
  modal: ModalInitialStateInfr;
  user: UserI;
}

export interface ModalConstI {
  SIGNIN: "SIGNIN";
  SIGNUP: "SIGNUP";
}

export interface DataInstanceInfr {
  id: string;
  Type: string;
  Name: string;
  ResourceRecords: [{ Value: string }] | null;
  TTL: number;
}
export interface RecordsInfr {
  data: [DataInstanceInfr];
}
