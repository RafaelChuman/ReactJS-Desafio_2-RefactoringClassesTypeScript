import React from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { useState } from "react";
import {Food} from "../Food";
import api from "../../services/api";

export type ModalAddFoodParams = {
  foods: Food[];
  isOpen: boolean;
  handleSetModalClose: ()=>void;
  setFoods: (value: React.SetStateAction<Food[] | undefined>) => void;
};

function ModalAddFood({isOpen, handleSetModalClose, foods, setFoods }: ModalAddFoodParams) {

  async function handleAddFood(food: Food) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      const newFoods = [...foods, response.data];

      setFoods(newFoods);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (data: Food) => {
    handleAddFood(data);
  };

  

  return (
    <Modal isOpen={isOpen} handleStatusModal={handleSetModalClose}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
