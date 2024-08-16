"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

interface User {
  name: string;
  amount: number;
  meals: number;
  balance: number; // To track if the user needs to pay more or get money back
}

const MealRateCalculator = () => {
  const [users, setUsers] = useState<User[]>([
    { name: "", amount: 0, meals: 0, balance: 0 },
  ]);
  const [totalBazar, setTotalBazar] = useState(0);
  const [mealRate, setMealRate] = useState(0);

  const handleUserChange = (
    index: number,
    field: keyof User,
    value: string | number
  ) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
    calculateTotals(newUsers);
  };

  const calculateTotals = (users: User[]) => {
    const totalBazar = users.reduce((sum, user) => sum + user.amount, 0);
    const totalMeals = users.reduce((sum, user) => sum + user.meals, 0);
    const mealRate = totalMeals > 0 ? totalBazar / totalMeals : 0;

    const updatedUsers = users.map((user) => {
      const expectedAmount = user.meals * mealRate;
      return {
        ...user,
        balance: user.amount - expectedAmount,
      };
    });

    setUsers(updatedUsers);
    setTotalBazar(totalBazar);
    setMealRate(mealRate);
  };

  const addUser = () => {
    setUsers([...users, { name: "", amount: 0, meals: 0, balance: 0 }]);
  };

  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold pb-5">Fill the form</h1>
      {users.map((user, index) => (
        <div key={index}>
          <div className="flex flex-row">
            <Input
              type="text"
              label="Name"
              value={user.name}
              onChange={(e) => handleUserChange(index, "name", e.target.value)}
              className="ml-5 text-white max-w-xs"
            />

            <Input
              type="number"
              label="Total Amount Given"
              value={user.amount}
              onChange={(e) =>
                handleUserChange(index, "amount", parseFloat(e.target.value))
              }
              className="ml-5 text-white"
            />

            <Input
              type="number"
              label="Total meals"
              value={user.meals}
              onChange={(e) =>
                handleUserChange(index, "meals", parseFloat(e.target.value))
              }
              className="ml-5 text-white"
            />
          </div>

          <p className="pt-3 pb-10">
            {user.balance > 0
              ? `${user.name} will get back ${user.balance.toFixed(2)} Taka.`
              : user.balance < 0
                ? `${user.name} needs to pay ${Math.abs(user.balance).toFixed(2)} Taka.`
                : `${user.name} is settled up`}
          </p>
        </div>
      ))}

      <Button
        color="primary"
        variant="shadow"
        onClick={addUser}
        className="px-8 mb-10"
      >
        Add User
      </Button>
      <div>
        <p>Total Bazar: ${totalBazar.toFixed(2)}</p>
        <p>Meal Rate: ${mealRate.toFixed(2)} per meal</p>
      </div>
    </div>
  );
};

export default MealRateCalculator;
