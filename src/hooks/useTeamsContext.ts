import { TeamsContext } from "@/components/modules/root/Providers/TeamsContextProvider";
import { useContext } from "react";

export default function useTeamsContext() {
  const context = useContext(TeamsContext)
  return context
}