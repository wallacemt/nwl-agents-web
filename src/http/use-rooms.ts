import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/room";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://192.168.248.202:3333/rooms");
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
}
