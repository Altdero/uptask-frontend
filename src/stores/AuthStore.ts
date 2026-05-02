import { makeAutoObservable } from "mobx";
import type { User } from "@/src/types";

export class AuthStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this, {}, { name: "AuthStore", autoBind: true });
  }

  setUser(user: User | null) {
    this.user = user;
  }

  get isAuthenticated() {
    return this.user !== null;
  }
}
