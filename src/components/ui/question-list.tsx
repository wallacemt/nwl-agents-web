import { useRoomQuestions } from "@/http/use-room-question";
import { QuestionItem } from "./question-item";

interface QuestionsListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionsListProps) {
  const { data } = useRoomQuestions(roomId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">Perguntas & Respostas</h2>
      </div>
      {data?.map((quest) => (
        <QuestionItem key={quest.id} question={quest} />
      ))}
    </div>
  );
}
