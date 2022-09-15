import React from "react";
import { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import {Food} from "../Food";
import api from "../../services/api";

export type ModalEditFoodPararms = {
  editingFood: Food;
  foods: Food[];
  isOpen: boolean;
  handleSetModalClose: ()=>void;
  setFoods: (value: React.SetStateAction<Food[] | undefined>) => void;
};

function ModalEditFood({isOpen, handleSetModalClose, editingFood, foods, setFoods }: ModalEditFoodPararms) {


  async function handleUpdateFood(foodForm: Food) {
    try {
      console.log(editingFood.id)
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...foodForm,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
    handleSetModalClose()
  }


  return (
    <Modal isOpen={isOpen} handleStatusModal={handleSetModalClose}>
      <Form onSubmit={handleUpdateFood} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;
