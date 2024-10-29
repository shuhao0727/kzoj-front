import { User } from "@/lib/user";
import { createContext } from "react";

export const UserContext = createContext<User | null>(null);
