import { Text } from "../Text";
import { ButtonContainer } from "./styles";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ children, onPress, disabled = false }: ButtonProps) {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled}>
      <Text weight="600" color="#fff">
        {children}
      </Text>
    </ButtonContainer>
  );
}
