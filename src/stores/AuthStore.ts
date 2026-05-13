import { makeAutoObservable } from "mobx";
import type { UserType } from "@/src/types";

export class AuthStore {
  user: UserType | null = null;

  constructor() {
    makeAutoObservable(this, {}, { name: "AuthStore", autoBind: true });
  }

  setUser(user: UserType | null) {
    this.user = user;
  }

  get isAuthenticated() {
    return this.user !== null;
  }
}
