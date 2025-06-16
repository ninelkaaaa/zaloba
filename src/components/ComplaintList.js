import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintList.css';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('https://zaloba-backend.onrender.com/api/complaints');
        setComplaints(res.data);
      } catch (err) {
        setError('Не удалось загрузить жалобы');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;
  if (complaints.length === 0) return <p className="empty">Жалобы отсутствуют</p>;

  return (
    <div className="complaint-list">
      <h2>Мои жалобы</h2>
      {complaints.map((complaint) => (
        <div key={complaint.id} className="complaint-card">
          <div className="complaint-row"><strong>Категория:</strong> {complaint.category}</div>
          <div className="complaint-row"><strong>Сообщение:</strong> {complaint.message}</div>
          <div className="complaint-row"><strong>Статус:</strong> {complaint.status_name}</div>
          <div className="complaint-row">
            <strong>Дата:</strong>{' '}
            {new Date(complaint.created_at).toLocaleString('ru-RU', {
              timeZone: 'Asia/Almaty',
            })}
          </div>
          {complaint.photo_url && (
            <img
              src={`https://zaloba-backend.onrender.com/api/uploads/${complaint.photo_url}`}
              alt="Фото жалобы"
              className="complaint-photo"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;