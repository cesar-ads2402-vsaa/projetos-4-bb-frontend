export interface Tutorial {
    id: number;
    pergunta: string;
    descricao: string;
    youtubeUrl: string;
    dataCriacao: string;
    categoria?: string;
}

export interface Audio {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
    nomeAutor?: string;
}

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: string;
}
export interface SelectionState {
    selectedLanguage: string | null;
    selectProcess: string | null;
    gatilhoPlayMuted: number;
    setLanguage: (nome: string) => void;
    setProcess: (nome: string) => void;
    dispararPlayMuted: () => void;
    reset: () => void;
}

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export interface VideoPlayerProps {
    urlYoutube?: string;
}
export interface AudioCardProps {
    audioId: number;
    nomeAutor?: string;
    caminhoArquivo: string;
    votosIniciais: number;
}

export interface ListaAudiosComunidadeProps {
    audios: Audio[];
    carregando: boolean;
}

export interface PainelFiltrosProps {
    idiomas: string[];
    processos: string[];
    idiomaSelecionado: string | null;
    processoSelecionado: string | null;
    aoMudarIdioma: (idioma: string) => void;
    aoMudarProcesso: (processo: string) => void;
}

export interface GravadorAudioProps {
    tutorialId: number;
    idioma: string | null;
}

export interface LoginResponseDTO {
    token: string;
    nome: string;
    cargo: string;
}