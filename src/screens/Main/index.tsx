import { Header } from "../../components/Header";
import { Categories } from "../../components/Categories";
import { Menu } from "../../components/Menu";
import {
  CategoriesContainer,
  Container,
  MenuContainer,
  Footer,
  FooterContainer,
} from "./styles";
import { Button } from "../../components/Button";

export function Main() {
  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          <Button onPress={() => alert("Novo pedido")}>Novo Pedido</Button>
        </FooterContainer>
      </Footer>
    </>
  );
}
