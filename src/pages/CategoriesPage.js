import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { getCategories } from "services/categories";
import { usePlayer } from "contexts/player";

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
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        { id: "random", name: "Random Questions" },
      ]);
    }
  }, [data?.trivia_categories]);

  const handleSelectCategory = (id) => {
    setSelectedCategory(id);
    setPlayerInfo({ ...playerInfo, selectedCategory: id });
  };

  const onStart = () => {
    if (!selectedCategory) {
      alert("Please Select a category first!");
    } else {
      setCookie("categoryId", selectedCategory);
      setPlayerInfo({
        ...playerInfo,
        selectedCategories: [
          ...playerInfo.selectedCategories,
          selectedCategory,
        ],
      });
      navigate({
        pathname: "/game-questions",
        search: createSearchParams({
          category: selectedCategory,
        }).toString(),
      });
    }
  };
  useEffect(() => {
    handleGettingCategories();
  }, [data, handleGettingCategories]);

  return (
    <Wrapper>
      <Title>{isLoading ? "...Loading" : "Questions Category"}</Title>
      <CategoriesContent>
        {categories.map(({ id, name }) => (
          <QuestionCard
            value={name}
            key={id}
            onClick={() => handleSelectCategory(id)}
            active={selectedCategory === id}
            disabled={playerInfo.selectedCategories.includes(id)}
          />
        ))}
      </CategoriesContent>
      <Button label="START" onClick={onStart} />
      <KeyboardHints showSelect showStart />
    </Wrapper>
  );
}
