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
import { useEffect, useState } from "react";
import { Cart } from "../../components/Cart";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { ActivityIndicator } from "react-native";
import { Category } from "../../types/Category";
import { api } from "../../service/api";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

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
    }
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        console.log([...prevState, { product, quantity: 1 }]);
        return [...prevState, { product, quantity: 1 }];
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

  async function getCategories() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/categories");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/products");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);
    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse);
        setProducts(productsResponse);
        setIsLoading(false);
      }
    );
  }, []);

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
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <Loading>
                <ActivityIndicator size="large" color="#d73035" />
              </Loading>
            ) : (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            )}
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
              selectedTable={selectedTable}
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
