import { ActivityIndicator } from "react-native";
import { Text } from "../Text";
import { ButtonContainer } from "./styles";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
    </ButtonContainer>
  );
}
