import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "./api";
import type { CreateQuestionRequest, CreateQuestionResponse } from "./types/room";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(`${baseUrl}/rooms/${roomId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: CreateQuestionResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });
    },
  });
}
