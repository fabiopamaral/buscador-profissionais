import AsyncStorage from "@react-native-async-storage/async-storage";
import { CATEGORIAS_KEY, PROFISSIONAIS_KEY } from "./mock";

export type Categoria = {
  id: number;
  nome: string;
};

export type Profissional = {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  fone: string;
  categoriaId: number | null;
};

export const getCategorias = async (): Promise<Categoria[]> => {
  const json = await AsyncStorage.getItem(CATEGORIAS_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveCategoria = async (categoria: Categoria): Promise<void> => {
  const categorias = await getCategorias();
  categorias.push({
    id: categoria.id || Date.now(),
    nome: categoria.nome || "Sem nome",
  });
  await AsyncStorage.setItem(CATEGORIAS_KEY, JSON.stringify(categorias));
};

export const deleteCategoria = async (categoriaId: number): Promise<void> => {
  const categorias = await getCategorias();
  const nova = categorias.filter((cat) => cat.id !== categoriaId);
  await AsyncStorage.setItem(CATEGORIAS_KEY, JSON.stringify(nova));
};

export const getProfissionais = async (): Promise<Profissional[]> => {
  const json = await AsyncStorage.getItem(PROFISSIONAIS_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveProfissional = async (
  profissional: Profissional
): Promise<void> => {
  const profissionais = await getProfissionais();
  profissionais.push(profissional);
  await AsyncStorage.setItem(PROFISSIONAIS_KEY, JSON.stringify(profissionais));
};
