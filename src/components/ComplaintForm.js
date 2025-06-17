
import axios from 'axios';
import './ComplaintForm.css';
import React, { useState, useEffect } from 'react';


const ComplaintForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://zaloba-backend.onrender.com/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Ошибка при загрузке категорий:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !message) {
      setStatusMessage('Пожалуйста, заполните все поля');
      return;
    }

    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('message', message);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.post('https://zaloba-backend.onrender.com/api/complaints', formData);
      setStatusMessage('Жалоба отправлена успешно');
      setMessage('');
      setSelectedCategory('');
      setPhoto(null);
    } catch (err) {
      console.error('Ошибка при отправке жалобы:', err);
      setStatusMessage('Ошибка при отправке');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="complaint-form">
      <h2>Оставить жалобы и предложения</h2>

      <label>Категория:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        required
      >
        <option value="">Выберите категорию</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <label>Сообщение:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Опишите проблему"
        required
      />

      <label>Фото (необязательно):</label>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

      <button type="submit">Отправить</button>

      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default ComplaintForm;