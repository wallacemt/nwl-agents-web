import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/room";
import { baseUrl } from "./api";

export function useRooms() {
  console.log(baseUrl)
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/rooms`);
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
}
