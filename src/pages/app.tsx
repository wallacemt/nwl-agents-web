// biome-ignore assist/source/organizeImports: is correct
import { Routes, Route } from "react-router";
import { CreateRoom } from "./create-room";
import { Room } from "./room";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecordRoomAudio } from "./record-room-audio";
const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<CreateRoom />} index />
        <Route element={<Room />} path="/room/:roomId" />
        <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
      </Routes>
    </QueryClientProvider> 
  );
}
