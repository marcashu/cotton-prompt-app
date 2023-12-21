import SessionContext from "@/contexts/SessionContext";
import { useContext } from "react";

export default function useSession() {
  const context = useContext(SessionContext)
  return context
}