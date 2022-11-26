import { useState } from "react";
import { FlatList } from "react-native";
import { Category } from "../../types/Category";
import { Text } from "../Text";
import { Category as CategoryContainer, Icon } from "./styles";

interface CategoriesProps {
  categories: Category[];
}

export function Categories({ categories }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? "" : categoryId;
    setSelectedCategory(category);
  }

  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={(category) => category._id}
      contentContainerStyle={{ paddingRight: 24 }}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>
            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
