import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="categorias" options={{ title: "Categorias" }} />
      <Tabs.Screen name="profissionais" options={{ title: "Profissionais" }} />
      <Tabs.Screen name="buscar" options={{ title: "Buscar" }} />
    </Tabs>
  );
}
