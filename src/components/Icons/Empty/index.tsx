import { SvgXml } from "react-native-svg";
import { Text } from "../../Text";

import { markup } from "./markup";
import { Container } from "./styles";

export function Empty() {
  return (
    <Container>
      <SvgXml xml={markup} />
      <Text color="#666" style={{ marginTop: 32 }}>
        Nenhum produto foi encontrado
      </Text>
    </Container>
  );
}
