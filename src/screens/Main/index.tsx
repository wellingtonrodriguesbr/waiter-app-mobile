import { Header } from "../../components/Header";
import { Categories } from "../../components/Categories";
import { Menu } from "../../components/Menu";
import {
  CategoriesContainer,
  Container,
  MenuContainer,
  Footer,
  FooterContainer,
  Loading,
} from "./styles";
import { Button } from "../../components/Button";
import { TableModal } from "../../components/TableModal";
import { useState } from "react";
import { Cart } from "../../components/Cart";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { ActivityIndicator } from "react-native";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    } else {
      setCartItems((prevState) => {
        const itemIndex = prevState.findIndex(
          (cartItem) => cartItem.product._id === product._id
        );

        if (itemIndex < 0) {
          return [...prevState, { quantity: 1, product }];
        }

        const newCartItems = [...prevState];
        const item = newCartItems[itemIndex];
        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity + 1,
        };

        return newCartItems;
      });
    }
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <Loading>
            <ActivityIndicator size="large" color="#d73035" />
          </Loading>
        ) : (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            <MenuContainer>
              <Menu onAddToCart={handleAddToCart} products={products} />
            </MenuContainer>
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
