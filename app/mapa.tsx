import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function MapaScreen() {
  const [local, setLocal] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let location = await Location.getCurrentPositionAsync({});
      setLocal(location.coords);
    })();
  }, []);

  if (!local) return <ActivityIndicator size="large" />;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: local.latitude,
        longitude: local.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker coordinate={local} title="Você" />
    </MapView>
  );
}
