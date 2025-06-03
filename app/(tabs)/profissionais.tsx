import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getCategorias, saveProfissional } from "../../data/storage";

export default function ProfissionaisScreen() {
  const [nome, setNome] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [fone, setFone] = useState<string>("");
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<
    { label: string; value: number }[]
  >([]);
  const [open, setOpen] = useState(false);

  const salvar = async () => {
    await saveProfissional({
      id: Date.now(),
      nome,
      endereco,
      cidade,
      fone,
      categoriaId,
    });
    setNome("");
    setEndereco("");
    setCidade("");
    setFone("");
    setCategoriaId(null);
  };

  useEffect(() => {
    getCategorias().then((data) => {
      setCategorias(
        data.map((c) => {
          return { label: c.nome, value: c.id };
        })
      );
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
          Cadastro de Profissional
        </Text>

        <TextInput
          placeholder="Digite o nome..."
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
          style={inputStyle}
        />
        <TextInput
          placeholder="Informe o endereço..."
          placeholderTextColor="#888"
          value={endereco}
          onChangeText={setEndereco}
          style={inputStyle}
        />
        <TextInput
          placeholder="Informe a cidade..."
          placeholderTextColor="#888"
          value={cidade}
          onChangeText={setCidade}
          style={inputStyle}
        />
        <TextInput
          placeholder="Fone..."
          placeholderTextColor="#888"
          value={fone}
          onChangeText={setFone}
          style={inputStyle}
        />

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
          onPress={salvar}
          style={{
            backgroundColor: "#007AFF",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Salvar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  backgroundColor: "#fff",
  padding: 12,
  marginBottom: 12,
};
