import { useState } from "react"

const initialItems = [

];
export default function App() {

  const [items, setItems] = useState(initialItems)

  const handleAddItem = (item) => {
    setItems((items => [...items, item]))
  }

  function handleDelete(itemId) {
    setItems((items) => items.filter(item => item.id !== itemId))

  }

  const handleToggle = (itemId) => {
    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }

  const handleReset = () => {
    const confirm = window.confirm('Are you sure you want to delete all items?');
    if (confirm)
      setItems([]);
  }




  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return <>
    <div>
      <header>
        <h1>🌴 Far Away 💼 </h1>
      </header>
      <AddForm onAddItem={handleAddItem} />
      <List items={items} onDelete={handleDelete} onToggle={handleToggle} onReset={handleReset} />

      <footer className="stats">
        {+numItems === 0 ? <em>Start adding some items to your packing list 🚀</em> :
          <em> {percentage === 100 ? "You got everything! Ready to go ✈️" : `💼 You have ${numItems} items on your list,
         and you already packed ${numPacked} 
         (${percentage}%)`}
          </em>}
      </footer>
    </div>

  </>


}

////////////////////////////////
const AddForm = ({ onAddItem }) => {
  const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')

  function handleSelect(e) {
    setQuantity(curquantity => e.target.value)
  };

  function handleDisc(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const item = { id: Date.now(), description, quantity, packed: false }
    onAddItem(item)

    setQuantity(1)
    setDescription('')


  }
  return (
    <form className="add-form"  >
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => handleSelect(e)}>
        {optionsArr.map(ele => <option>{ele}</option>)}
      </select>
      <input type="text" value={description} placeholder="item..." onChange={(e) => handleDisc(e)} />
      <button onClick={(e) => handleSubmit(e)} >Add</button>
    </form>
  )
}

/////////////////////////

const List = ({ items, onDelete, onToggle, onReset }) => {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems = items;


  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item =>
          <li >
            <input type="checkbox" value={item.packed} onChange={() => onToggle(item.id)} />
            <span style={item.packed ? { textDecoration: 'line-through' } : null}>{item.description} ({item.quantity})</span>
            <button style={{ padding: '0' }} onClick={() => onDelete(item.id)}>❌</button>
          </li>
        )}
      </ul>

      <div className="actions">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by Description</option>
          <option value='status'>sort by status</option>
        </select>
        <button onClick={onReset}>Clear List</button>
      </div>
    </div>
  );
}

