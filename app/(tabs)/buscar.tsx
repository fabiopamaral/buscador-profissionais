import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  getCategorias,
  getProfissionais,
  Profissional,
} from "../../data/storage";
import { useRouter } from "expo-router";

type DropDownItem = {
  label: string;
  value: number;
};

export default function BuscarScreen() {
  const [open, setOpen] = useState(false);
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<DropDownItem[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCategorias().then((data) => {
      setCategorias(data.map((c) => ({ label: c.nome, value: c.id })));
    });
  }, []);

  const filtrar = async () => {
    const todos = await getProfissionais();
    setProfissionais(
      todos.filter((p: Profissional) => p.categoriaId === categoriaId)
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
          Buscar Profissionais
        </Text>

        <DropDownPicker
          open={open}
          value={categoriaId}
          items={categorias}
          setOpen={setOpen}
          setValue={setCategoriaId}
          setItems={setCategorias}
          placeholder="Selecione a categoria"
          style={{
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 16,
          }}
          dropDownContainerStyle={{
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />

        <TouchableOpacity
          onPress={filtrar}
          style={{
            backgroundColor: "#007AFF",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Buscar
          </Text>
        </TouchableOpacity>

        {profissionais.length === 0 ? (
          <Text style={{ color: "#888", fontStyle: "italic" }}>
            Nenhum profissional encontrado.
          </Text>
        ) : (
          <FlatList
            data={profissionais}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 12,
                  borderColor: "#ddd",
                  borderWidth: 1,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.nome}
                </Text>
                <Text style={{ color: "#555" }}>{item.cidade}</Text>
                <Text style={{ color: "#555" }}>{item.fone}</Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity
          onPress={() => router.push("/mapa")}
          style={{
            marginTop: 16,
            backgroundColor: "#34C759",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Ver no Mapa
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
