import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { dayjs } from "@/lib/dayjs";
import { Link } from "react-router";
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
  const { data, isLoading } = useRooms();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>Acesso rápido para salas criadas recentemente</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && <p className="text-muted-foreground text-sm">Carregando Salas...</p>}
        {data?.map((room) => (
          <Link
            to={`/room/${room.id}`}
            key={room.id}
            className="flex items-center juftify-between  rounded-lg border  p-3 hover:bg-accent/50"
          >
            <div className="flex-1 flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className="text-xs" variant={"secondary"}>
                  {dayjs(new Date(room.createdAt)).toNow()}
                </Badge>
                <Badge className="text-xs" variant={"secondary"}>
                  {room.questionsCount} pergunta(s)
                </Badge>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm">
              Entrar
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
