import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  getCategorias,
  saveCategoria,
  deleteCategoria,
  Categoria,
} from "../../data/storage";
import { popularComMocks } from "@/data/mock";

export default function CategoriasScreen() {
  const [nome, setNome] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const salvar = async () => {
    if (!nome.trim()) return;
    await saveCategoria({ id: Date.now(), nome: nome.trim() });
    setNome("");
    carregar();
  };

  const remover = async (id: number) => {
    await deleteCategoria(id);
    carregar();
  };

  const carregar = async () => {
    const data = await getCategorias();

    if (!data || data.length === 0) {
      await popularComMocks();
    }

    const dadosPopulados = await getCategorias();
    const filtrado = dadosPopulados.filter(
      (item: Categoria) => item && item.id && item.nome
    );
    setCategorias(filtrado);
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Adicionar Categoria
      </Text>

      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome da categoria"
        placeholderTextColor="#888"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
          backgroundColor: "#fff",
        }}
      />

      <TouchableOpacity
        onPress={salvar}
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
      </TouchableOpacity>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item?.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item?.nome || "Sem nome"}</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Excluir Categoria",
                  `Deseja excluir a categoria "${item.nome}"?`,
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Excluir",
                      onPress: () => remover(item.id),
                      style: "destructive",
                    },
                  ]
                )
              }
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 18, color: "#FF3B30" }}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
