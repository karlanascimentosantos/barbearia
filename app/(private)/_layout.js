import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, backgroundColor: "#E9CA4F" }}>
        <Text style={{ color: "#020202ff", fontSize: 20, fontWeight: "bold" }}>Menu</Text>
      </View>

      {/* Aqui entram as páginas */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function PrivateLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#251e00ff',
        drawerInactiveTintColor: '#524617',
        headerStyle: { backgroundColor: "#E9CA4F" },
        headerTintColor: "#000000ff",
       drawerStyle: {
        backgroundColor: "#E9CA4F", 
        
    },
      }}
    >
      <Drawer.Screen
        name="PaginaInicial"
        options={{ title: 'Página Inicial',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
     <Drawer.Screen
        name="Agenda"
        options={{ title: 'Agenda',
        drawerIcon: ({ color, size }) => (
        <MaterialCommunityIcons
        name="notebook-minus-outline"
        size={size}
        color={color}
        />
    ),
  }}
/>
      <Drawer.Screen
        name="Historico"
        options={{ title: 'Histórico',
           drawerIcon: ({ color, size }) => (
        <Ionicons name="time-outline" size={size} color={color} />
          ),
         }}
      />
      <Drawer.Screen
        name="Perfil"
        options={{ title: 'Perfil',
         drawerIcon: ({ color, size }) => (
        <Ionicons name="person-outline" size={size} color={color} />
          ),
         }}
      />
    </Drawer>
  );
}
