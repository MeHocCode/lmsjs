import { useState, useEffect } from 'react';

export default function CategoryForm({ category, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(category ? category.name : '');
    setError('');
  }, [category]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Vui lòng nhập tên thể loại!');
      return;
    }
    setError('');
    onSave({ name: name.trim() });
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label className="form-label">Tên thể loại *</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Lưu
        </button>
        {category && <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>}
      </div>
    </div>
  );
}
