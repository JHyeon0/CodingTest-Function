import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "../style/stylesheet";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

interface CenterProps {}

export const EmptyList: React.FC<CenterProps> = () => {
  return (
    <View style={styles.emptyList}>
      <Text>장소가 비었습니다.</Text>
    </View>
  );
};
