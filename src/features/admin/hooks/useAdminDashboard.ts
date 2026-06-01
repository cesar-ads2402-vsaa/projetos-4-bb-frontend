"use client";

import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { Tutorial, Audio, Usuario } from "@/types/types";
import { formatarUrlYoutube } from "@/utils/youtube";

import { TutorialService } from "@/services/TutorialService";
import { AudioService } from "@/services/AudioService";
import { UsuarioService } from "@/services/UsuarioService";
import { IdiomaService } from "@/services/IdiomaService";
import {FiCreditCard, FiDollarSign, FiGrid, FiLock, FiSmartphone} from "react-icons/fi";

export function useAdminDashboard() {
    const [abaAtiva, setAbaAtiva] = useState<"TUTORIAIS" | "MODERACAO" | "USUARIOS" | "IDIOMAS">("TUTORIAIS");
    const [tutoriais, setTutoriais] = useState<Tutorial[]>([]);
    const [audiosPendentes, setAudiosPendentes] = useState<Audio[]>([]);
    const [usuariosComuns, setUsuariosComuns] = useState<Usuario[]>([]);
    const [audiosAprovados, setAudiosAprovados] = useState<Audio[]>([]);
    const [cargoLogado, setCargoLogado] = useState<string | null>(null);

    const [novaPergunta, setNovaPergunta] = useState("");
    const [novaUrl, setNovaUrl] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("");
    const [carregandoForm, setCarregandoForm] = useState(false);

    // Estados de Idiomas e Filtros
    const [idiomas, setIdiomas] = useState<any[]>([]);
    const [novoNomeIdioma, setNovoNomeIdioma] = useState("");
    const [novoCodigoIdioma, setNovoCodigoIdioma] = useState("");
    const [filtroIdioma, setFiltroIdioma] = useState("");
    const [filtroModIdioma, setFiltroModIdioma] = useState("");
    const [filtroModTutorial, setFiltroModTutorial] = useState("");



    // --- FUNÇÕES DE BUSCA (GET) ---
    const buscarTutoriais = async () => {
        try { const res = await TutorialService.listarTodos(); setTutoriais(res || []); }
        catch (e) { console.error("Erro ao buscar tutoriais"); }
    };

    const buscarAudiosPendentes = async () => {
        try { const res = await AudioService.listarPendentes(); setAudiosPendentes(res || []); }
        catch (e) { console.error("Erro ao buscar áudios pendentes"); }
    };

    const buscarUsuariosComuns = async () => {
        try { const res = await UsuarioService.listarComuns(); setUsuariosComuns(res || []); }
        catch (e) { console.error("Erro ao buscar usuários"); }
    };

    const buscarAudiosAprovados = async () => {
        try { const res = await AudioService.listarAprovados(); setAudiosAprovados(res || []); }
        catch (e) { console.error("Erro ao buscar aprovados"); }
    };

    const buscarIdiomas = async () => {
        try { const res = await IdiomaService.listarTodos(); setIdiomas(res || []); }
        catch (e) { console.error("Erro ao buscar idiomas"); }
    };

    useEffect(() => {
        setCargoLogado(localStorage.getItem("cargo"));
        if (abaAtiva === "TUTORIAIS") buscarTutoriais();
        if (abaAtiva === "MODERACAO") {
            buscarAudiosPendentes();
            buscarAudiosAprovados();
            buscarIdiomas(); // Carrega idiomas para o filtro
        }
        if (abaAtiva === "USUARIOS") buscarUsuariosComuns();
        if (abaAtiva === "IDIOMAS") buscarIdiomas();
    }, [abaAtiva]);

    // --- FUNÇÕES DE AÇÃO ---
    const criarTutorial = async () => {
        if (!novaPergunta || !novaUrl || !novaCategoria) return toaster.create({ title: "Preencha tudo!", type: "warning" });
        setCarregandoForm(true);
        setCarregandoForm(true);
        try {
            const urlFormatada = formatarUrlYoutube(novaUrl);
            // 3. Enviar a categoria para o Service
            await TutorialService.criar({
                pergunta: novaPergunta,
                youtubeUrl: urlFormatada,
                categoria: novaCategoria
            });

            toaster.create({ title: "Criado com sucesso!", type: "success" });
            setNovaPergunta("");
            setNovaUrl("");
            setNovaCategoria(""); // Limpar após criar
            buscarTutoriais();
        } catch (e) {
            toaster.create({ title: "Erro ao criar", type: "error" });
        } finally {
            setCarregandoForm(false);
        }
    };

    const deletarTutorial = async (id: number) => {
        if (!window.confirm("Atenção: Deletar este tutorial apagará TODOS os áudios associados!")) return;
        try {
            await TutorialService.deletar(id);
            toaster.create({ title: "Tutorial deletado!", type: "success" });
            buscarTutoriais();
        } catch (e) { toaster.create({ title: "Erro ao deletar", type: "error" }); }
    };

    const aprovarAudio = async (id: number) => {
        try {
            await AudioService.aprovar(id);
            toaster.create({ title: "Áudio aprovado!", type: "success" });
            buscarAudiosPendentes(); buscarAudiosAprovados();
        } catch (e) { toaster.create({ title: "Erro ao aprovar", type: "error" }); }
    };

    const reprovarAudio = async (id: number) => {
        if (!window.confirm("Deseja apagar permanentemente este áudio?")) return;
        try {
            await AudioService.reprovar(id);
            toaster.create({ title: "Áudio apagado.", type: "success" });
            buscarAudiosPendentes();
        } catch (e) { toaster.create({ title: "Erro ao reprovar", type: "error" }); }
    };

    const excluirAudioPostado = async (id: number) => {
        if (!window.confirm("Deseja realmente excluir este áudio publicado?")) return;
        try {
            await AudioService.deletarPostado(id);
            toaster.create({ title: "Áudio removido!", type: "success" });
            buscarAudiosAprovados();
        } catch (e) { toaster.create({ title: "Erro ao excluir", type: "error" }); }
    };

    const promoverUsuario = async (id: number, nome: string) => {
        if (!window.confirm(`Promover ${nome} a ADMIN?`)) return;
        try {
            await UsuarioService.promover(id);
            toaster.create({ title: "Sucesso!", type: "success" });
            buscarUsuariosComuns();
        } catch (e) { toaster.create({ title: "Erro ao promover", type: "error" }); }
    };

    const rebaixarUsuario = async (id: number, nome: string) => {
        if (!window.confirm(`Remover poderes de Admin de ${nome}?`)) return;
        try {
            await UsuarioService.rebaixar(id);
            toaster.create({ title: "Sucesso!", type: "success" });
            buscarUsuariosComuns();
        } catch (e: any) {
            toaster.create({ title: "Sem permissão!", type: "error" });
        }
    };

    const criarIdioma = async () => {
        if (!novoNomeIdioma || !novoCodigoIdioma) return toaster.create({ title: "Preencha tudo!", type: "warning" });
        setCarregandoForm(true);
        try {
            await IdiomaService.criar({ nome: novoNomeIdioma, codigo: novoCodigoIdioma });
            toaster.create({ title: "Cadastrado!", type: "success" });
            setNovoNomeIdioma(""); setNovoCodigoIdioma("");
            buscarIdiomas();
        } catch (e) { toaster.create({ title: "Erro ao criar", type: "error" }); }
        finally { setCarregandoForm(false); }
    };

    const deletarIdioma = async (id: number) => {
        if (!window.confirm("Cuidado: Isso pode afetar áudios já postados!")) return;
        try {
            await IdiomaService.deletar(id);
            toaster.create({ title: "Removido!", type: "success" });
            buscarIdiomas();
        } catch (e) { toaster.create({ title: "Erro ao deletar", type: "error" }); }
    };

    return {
        estados: {
            abaAtiva,
            tutoriais,
            audiosPendentes,
            usuariosComuns,
            audiosAprovados,
            cargoLogado,
            filtroIdioma, //
            filtroModIdioma,
            filtroModTutorial,
            idiomas,
            form: { novaPergunta, novaUrl,novaCategoria, carregandoForm },
            formIdioma: { novoNomeIdioma, novoCodigoIdioma }
        },
        acoes: {
            setAbaAtiva,
            setNovaPergunta,
            setNovaUrl,
            setNovaCategoria,
            criarTutorial,
            deletarTutorial,
            aprovarAudio,
            reprovarAudio,
            promoverUsuario,
            excluirAudioPostado,
            rebaixarUsuario,
            setNovoNomeIdioma,
            setNovoCodigoIdioma,
            criarIdioma,
            deletarIdioma,
            setFiltroIdioma,
            setFiltroModIdioma,
            setFiltroModTutorial,
        }
    };
}