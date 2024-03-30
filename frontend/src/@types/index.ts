export interface ModalInitialStateInfr {
  toggle: boolean;
  target: "SIGNIN" | "SIGNUP" | "";
}

export interface Store {
  modal: ModalInitialStateInfr;
  records: RecordsInfr;
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
  data: [DataInstanceInfr]
}
