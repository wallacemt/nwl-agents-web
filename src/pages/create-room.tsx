import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

type GetRoomsApiResponse = Array<{
  id: string;
  name: string;
}>;
export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsApiResponse = await response.json();
      return result;
    },
  });
  return (
    <div className="mx-auto max-w-2xl">
      {isLoading && <div>Loading...</div>}
      <ul>
        {data?.map((room) => (
          <li key={room.id}>
            <Link
              to={`/room/${room.id}`}
              className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {room.name}
            </Link>
          </li>
        ))}
      </ul>

      <h1>Create Room</h1>
    </div>
  );
}
