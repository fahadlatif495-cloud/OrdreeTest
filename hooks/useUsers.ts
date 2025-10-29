import { PlaceholderAlbum, PlaceholderUser } from "@/types/placeholder";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ;

async function fetchUsers(): Promise<PlaceholderUser[]> {
  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60, 
  });
};


async function fetchAlbums(): Promise<PlaceholderAlbum[]> {
  const res = await fetch(`${API_BASE_URL}/albums`);
  if (!res.ok) throw new Error("Failed to fetch albums");
  return res.json();
}

export const useAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: fetchAlbums,
    staleTime: 1000 * 60, 
  });
};
