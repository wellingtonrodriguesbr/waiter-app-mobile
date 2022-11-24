import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import {
  CloseButton,
  Footer,
  FooterContainer,
  Header,
  Ingredient,
  Ingredients,
  ModalBody,
  PriceContainer,
  ProductImage,
} from "./styles";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ProductImage
        source={{
          uri: `http://192.168.0.105:3333/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </ProductImage>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>
        {product.ingredients.length > 0 && (
          <Ingredients>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>
            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Ingredient>
                  <Text>{item.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {item.name}
                  </Text>
                </Ingredient>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Ingredients>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>
          <Button onPress={() => alert("oi")}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
