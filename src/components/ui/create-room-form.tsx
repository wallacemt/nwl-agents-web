import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useCreateRoom } from "@/http/use-create-room";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
  description: z.string(),
});
type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();
  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({ name, description });
    createRoomForm.reset();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Sala</CardTitle>
        <CardDescription>Crie uma nova sala para fazer perguntas e receber repostas da I.A</CardDescription>
        <CardContent>
          <Form {...createRoomForm}>
            <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
              <FormField
                control={createRoomForm.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nome da Sala</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o nome da sala" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={createRoomForm.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Descrição da Sala</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button className="w-full" type="submit">
                Criar sala
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
