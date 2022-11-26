import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import {
  Actions,
  CartItemContainer,
  Image,
  Item,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from "./styles";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          style={{ marginBottom: 20, maxHeight: 150 }}
          keyExtractor={(item) => item.product._id}
          renderItem={({ item }) => (
            <CartItemContainer>
              <Item>
                <Image
                  source={{
                    uri: `http://192.168.0.105:3333/uploads/${item.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {item.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {item.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(item.product.price)}
                  </Text>
                </ProductDetails>
              </Item>
              <Actions>
                <TouchableOpacity onPress={() => onAdd(item.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDecrement(item.product)}
                  style={{ marginLeft: 24 }}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </CartItemContainer>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#666">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
