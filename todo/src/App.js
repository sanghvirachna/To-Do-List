import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText,setUpdateItemText] = useState('');


  // Add new items to the database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/item', { item: itemText });
      console.log(res.data);
      setListItems(prev => [...prev,res.data]); // Add the newly created item to the listItems state
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  };

  // Create function to fetch all items from the database
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/item');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  //update items 


  const updateItem = async(e) => {
    try{
      e.preventDefault();
        const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`,{item:updateItemText})
        const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating)
        const updatedItem = listItems[updatedItemIndex].item = updateItemText
        setUpdateItemText('')
        setIsUpdating('')
        console.log(res.data)
    }
    catch(err){
      console.log(err);
    }
  }
   const renderUpdateForm = () => {
    return (
      <>
      <div className="update-form" onSubmit={(e) => {updateItem(e)}}>
        <input
          className='update-new-input'
          type="text"
          placeholder="Update todo item"
          value={updateItemText}
          onChange={e => {setUpdateItemText(e.target.value)}}
        />
        <button className="update-new-btn" type="submit" onClick={(e) => {updateItem(e)}}>Update</button>
      </div>
      </>
    );
  };
   // Delete an item from the database and remove it from the listItems state
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`);
      console.log("deleted");
      setListItems(listItems.filter(item => item._id !== id)); // Remove the deleted item from listItems
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <form className='form' onSubmit={addItem}>
        <div className='inputs'>
          <input
            type='text'
            placeholder='Enter todo Item'
            onChange={(e) => setItemText(e.target.value)}
            value={itemText}
          />
          <button type="submit">Add</button>
        </div>
        <div className='todo-listItems'>
          {listItems
            .filter(item => item.item) // Filter out items with empty or null values
            .map(item => (
              <div className='todo-item' key={item._id}>
                {
                  isUpdating === item._id ? renderUpdateForm()
                   :  <>
                      <p className="item-content">{item.item}</p>
                      <button className='update-item' onClick={() => {setIsUpdating(item._id)}}>Update</button>
                      <button className='delete-item' onClick={() => deleteItem(item._id)}>Delete</button>
                    </>
                }


              </div>
            ))}
        </div>
      </form>
    </div>
  );
}

export default App;
