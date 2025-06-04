import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newItem = { id: Date.now(), text: input.trim() };
    setItems([...items, newItem]);
    setInput('');
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editingText.trim()) return;
    setItems(
      items.map((item) =>
        item.id === editingId ? { ...item, text: editingText.trim() } : item
      )
    );
    cancelEdit();
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <h1>Item Manager</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new item"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginTop: '8px' }}>
            {editingId === item.id ? (
              <form onSubmit={saveEdit} style={{ display: 'inline' }}>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{item.text}</span>{' '}
                <button onClick={() => startEdit(item)}>Edit</button>{' '}
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
