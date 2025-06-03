import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getCategorias, saveProfissional } from "../../data/storage";

export default function ProfissionaisScreen() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [fone, setFone] = useState("");
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

    Alert.alert("Sucesso", "Profissional cadastrado com sucesso!");
  };

  useEffect(() => {
    getCategorias().then((data) => {
      setCategorias(data.map((c) => ({ label: c.nome, value: c.id })));
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1, backgroundColor: "#f9f9f9", padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
          Cadastro de Profissional
        </Text>

        <View style={{ zIndex: 1000, marginBottom: 20 }}>
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
            }}
            dropDownContainerStyle={{
              borderColor: "#ccc",
              borderRadius: 8,
            }}
          />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
        >
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

          <TouchableOpacity
            onPress={salvar}
            style={{
              backgroundColor: "#007AFF",
              padding: 14,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Salvar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
