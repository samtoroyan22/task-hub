import { getProfile } from "@/services/profile/profile-client";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return { user: data };
}
