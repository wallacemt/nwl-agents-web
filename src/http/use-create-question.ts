import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "./api";
import type { CreateQuestionRequest, CreateQuestionResponse, GetRoomQuestionsResponse } from "./types/room";

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
    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>(["get-questions", roomId]);

      const questionsArray: GetRoomQuestionsResponse = questions ?? [];
      const newQuestion = {
        id: crypto.randomUUID(),
        questions: question, 
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true
      };
      queryClient.setQueryData<GetRoomQuestionsResponse>(["get-questions", roomId], [newQuestion, ...questionsArray]);

      return { newQuestion, questions: questionsArray };
    },
    onSuccess(data, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(["get-questions", roomId], (questions) => {
          if (!questions) {
            return questions;
          }
          if (!context.newQuestion) {
            return questions;
          }
          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false
              };
            }
            return question;
          });
        });
      }
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData(["get-questions", roomId], context.questions);
      }
    },
  });
}
