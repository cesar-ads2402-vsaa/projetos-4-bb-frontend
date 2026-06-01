import { useState, useEffect } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { Audio, Tutorial } from "@/types/types"
import {TutorialService} from "@/services/TutorialService";
import {AudioService} from "@/services/AudioService";
import { IdiomaService } from "@/services/IdiomaService";



export function useMediaView() {
    const { selectedLanguage, selectProcess, setLanguage, setProcess } = useSelectionStore();
    const [idiomasDisponiveis, setIdiomasDisponiveis] = useState<string[]>([]);

    const [tutoriais, setTutoriais] = useState<Tutorial[]>([]);
    const [audiosComunidade, setAudiosComunidade] = useState<Audio[]>([]);
    const [carregandoAudios, setCarregandoAudios] = useState(false);

    useEffect(() => {
        async function buscarIdiomas() {
            try {
                const dados = await IdiomaService.listarTodos();

                const nomes = dados.map((idioma: any) => idioma.nome);
                setIdiomasDisponiveis(nomes);
            } catch (error) {
                console.error("Erro ao buscar a lista de idiomas:", error);
                setIdiomasDisponiveis(["Português"]);
            }
        }
        buscarIdiomas();
    }, []);

    useEffect(() => {
        async function buscarTutoriais() {
            try {
                // Vai no Java buscar os processos (Pagamento, Serviço, etc)
                const dados = await TutorialService.listarTodos();
                setTutoriais(dados || []);
            } catch (error) {
                console.error("Erro ao buscar a lista de tutoriais:", error);
            }
        }
        buscarTutoriais();
    }, []);

    const processosNomes = tutoriais.map(t => t.pergunta);
    const conteudoAtual = tutoriais.find(t => t.pergunta === selectProcess) || null;

    useEffect(() => {
        async function buscarAudios() {
            if (!selectedLanguage || !conteudoAtual) {
                setAudiosComunidade([]);
                return;
            }

            setCarregandoAudios(true);
            try {

                const dados = await AudioService.listarPorTutorialEIdioma(conteudoAtual.id, selectedLanguage);
                setAudiosComunidade(dados || []);

            } catch (erro) {
                console.error("Erro ao buscar áudios reais:", erro);
                setAudiosComunidade([]);
            }finally {
                setCarregandoAudios(false);
            }
        }

        buscarAudios();
    }, [selectedLanguage, conteudoAtual]);

    return {
        estados: {
            selectedLanguage,
            selectProcess,
            audiosComunidade,
            carregandoAudios,
            processosNomes,
            conteudoAtual
        },
        acoes: { setLanguage, setProcess },
        configs: { idiomas: idiomasDisponiveis}
    };
}