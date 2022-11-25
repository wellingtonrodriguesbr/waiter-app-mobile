import { Modal, StatusBar } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Button, OrderConfirmedModalContainer } from "./styles";

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({
  visible,
  onOk,
}: OrderConfirmedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <OrderConfirmedModalContainer>
        <CheckCircle />
        <Text weight="600" size={20} color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <Button onPress={onOk}>
          <Text weight="600" color="#D73035">
            OK
          </Text>
        </Button>
      </OrderConfirmedModalContainer>
    </Modal>
  );
}
