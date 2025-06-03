import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import {
  getCategorias,
  getProfissionais,
  Profissional,
} from "../../data/storage";
import { useFocusEffect, useRouter } from "expo-router";

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

  useFocusEffect(
    useCallback(() => {
      getCategorias().then((data) => {
        setCategorias(data.map((c) => ({ label: c.nome, value: c.id })));
      });
    }, [])
  );

  const filtrar = async () => {
    if (!categoriaId) {
      setProfissionais([]);
      return;
    }

    const todos = await getProfissionais();
    const filtrados = todos.filter((p) => p.categoriaId === categoriaId);
    setProfissionais(filtrados);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 20,
        zIndex: 1000,
      }}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginVertical: 16 }}
            >
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
              listMode="SCROLLVIEW"
              style={{
                borderColor: "#ccc",
                borderRadius: 8,
                marginBottom: open ? 140 : 16,
                zIndex: 2000,
              }}
              dropDownContainerStyle={{
                borderColor: "#ccc",
                borderRadius: 8,
                maxHeight: 150, //
                zIndex: 2000,
              }}
              zIndex={2000}
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

            {profissionais.length === 0 && (
              <Text style={{ color: "#888", fontStyle: "italic" }}>
                Nenhum profissional encontrado.
              </Text>
            )}
          </>
        }
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
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.nome}
              </Text>
              <Text style={{ color: "#555" }}>{item.cidade}</Text>
              <Text style={{ color: "#555" }}>{item.fone}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                const numero = item.fone.replace(/\D/g, "");
                Linking.openURL(`https://wa.me/55${numero}`);
              }}
              style={{ marginLeft: 12 }}
            >
              <FontAwesome name="whatsapp" size={28} color="#25D366" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
