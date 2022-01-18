import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(updatedItem) {
    const newList = items.map((item) => {
      if (updatedItem.id === item.id) {
        return updatedItem;
      }
      return item;
    });
    setItems(newList);
  }

  function handleDeleteItem(itemToDelete) {
    const newList = items.filter((item) => item.id !== itemToDelete.id);
    setItems(newList);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleAddItem(item) {
    const newArray = [...items, item];
    setItems(newArray);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
