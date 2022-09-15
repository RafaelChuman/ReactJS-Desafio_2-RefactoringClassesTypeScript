import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import { Food, FoodComponent, FoodParams } from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

function Dashboard() {
  const [foods, setFoods] = useState<Food[]>();
  const [editingFood, setEditingFood] = useState<Food>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);



  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    if (foods) {
      const foodsFiltered = foods.filter((food) => food.id !== id);
      setFoods(foodsFiltered);
    }
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  useEffect(() => {
    api.get("/foods").then((response) => setFoods(response.data));
  }, []);

  return (
    <>
      <Header openModal={toggleModal} />
      {foods && (
        <ModalAddFood
          isOpen={modalOpen}
          handleSetModalClose={toggleModal}
          foods={foods}
          setFoods={setFoods}
        />
      )}

      {foods && editingFood && (
        <ModalEditFood
          isOpen={editModalOpen}
          handleSetModalClose={toggleEditModal}
          foods={foods}
          setFoods={setFoods}
          editingFood={editingFood}
        />
      )}
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <FoodComponent
              key={food.id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
