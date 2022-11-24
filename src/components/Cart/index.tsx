import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import {
  Actions,
  CartItemContainer,
  Image,
  Item,
  ProductDetails,
  QuantityContainer,
} from "./styles";

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
  return (
    <FlatList
      data={cartItems}
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
            <TouchableOpacity>
              <PlusCircle />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 24 }}>
              <MinusCircle />
            </TouchableOpacity>
          </Actions>
        </CartItemContainer>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
