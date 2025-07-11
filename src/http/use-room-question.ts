import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/room";
import { baseUrl } from "./api";

export function useRoomQuestions(roomId: string) {
  
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/rooms/${roomId}/questions`);
      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
  });
}
