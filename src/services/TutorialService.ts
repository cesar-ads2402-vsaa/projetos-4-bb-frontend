import { api } from "@/lib/api";
import { Tutorial } from "@/types/types";

export const TutorialService = {
    listarTodos: () => api.get<Tutorial[]>("/tutoriais"),
    criar: (dados: { pergunta: string; youtubeUrl: string; categoria: string }) => api.post("/tutoriais", dados),
    deletar: (id: number) => api.delete(`/tutoriais/${id}`),
};