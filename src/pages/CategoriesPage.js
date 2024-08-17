import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { getCategories } from "services/categories";
import { usePlayer } from "contexts/player";
import { KEYBOARD_KEYS } from "constants/keyboard-keys";

import Button from "components/Button";
import QuestionCard from "components/QuestionCard/index";
import KeyboardHints from "components/KeyboardHints/index";

const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 34px;
  text-align: center;
  white-space: pre-wrap;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 69px;
  margin-bottom: 20px;
`;

const CategoriesContent = styled.div`
  max-width: 1110px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 60px;
  @media (max-width: 576px) {
    gap: 30px;
  }
`;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [_, setCookie] = useCookies();
  const { playerInfo, setPlayerInfo } = usePlayer();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleGettingCategories = useCallback(() => {
    if (data?.trivia_categories) {
      setCategories([
        ...data.trivia_categories,
        { id: "random", name: "Random Questions", index: 25 },
      ]);
    }
  }, [data?.trivia_categories]);

  const handleSelectCategory = ({ name, index, id }) => {
    setSelectedCategory({ name, index, id });
    setPlayerInfo({ ...playerInfo, selectedCategory: name });
  };

  const onStart = () => {
    if (!selectedCategory?.name) {
      alert("Please Select a category first!");
    } else {
      setCookie("categoryName", selectedCategory.name);
      setPlayerInfo({
        ...playerInfo,
        selectedCategories: [
          ...playerInfo.selectedCategories,
          selectedCategory.name,
        ],
      });
      navigate({
        pathname: "/game-questions",
        search: createSearchParams({
          category: selectedCategory.id,
        }).toString(),
      });
    }
  };

  useEffect(() => {
    handleGettingCategories();
  }, [data, handleGettingCategories]);

  window.onkeydown = function (e) {
    if (e.target.tagName === "INPUT") {
      return;
    }
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === KEYBOARD_KEYS.RIGHT) {
      const newIndex =
        selectedCategory.name &&
        selectedCategory.index !== categories.length - 1
          ? selectedCategory.index + 1
          : 0;
      setSelectedCategory({
        name: categories[newIndex].name,
        id: categories[newIndex].id,
        index: newIndex,
      });
    } else if (code === KEYBOARD_KEYS.LEFT) {
      const newIndex =
        selectedCategory.name && selectedCategory.index
          ? selectedCategory.index - 1
          : 0;
      setSelectedCategory({
        name: categories[newIndex].name,
        id: categories[newIndex].id,
        index: newIndex,
      });
    } else if (code === KEYBOARD_KEYS.S) {
      onStart();
    }
  };

  return (
    <Wrapper>
      <Title>{isLoading ? "...Loading" : "Questions Category"}</Title>
      <CategoriesContent>
        {categories.map(({ id, name }, index) => (
          <QuestionCard
            value={name}
            key={id}
            onClick={() => handleSelectCategory({ name, index, id })}
            active={selectedCategory.id === id}
            disabled={playerInfo.selectedCategories.includes(name)}
          />
        ))}
      </CategoriesContent>
      <Button label="START" onClick={onStart} />
      <KeyboardHints showSelect showStart />
    </Wrapper>
  );
}
