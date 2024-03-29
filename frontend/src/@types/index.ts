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

export interface RecordsInfr {
  data: [{ id: string; Type: string; Name: string; ResourceRecords: [{}] | null; TTL: number }];
}
