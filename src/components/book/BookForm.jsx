import { useState, useEffect } from 'react';

export default function BookForm({ book, categories = [], onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '', author: '', categoryId: '', totalCopies: 1, availableCopies: 1, coverImage: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) setForm(book);
    else setForm({ title: '', author: '', categoryId: '', totalCopies: 1, availableCopies: 1, coverImage: '' });
  }, [book]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.author.trim() || !form.categoryId) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
    if (parseInt(form.availableCopies) > parseInt(form.totalCopies)) {
      setError('Số sách còn lại không được vượt quá tổng số!');
      return;
    }
    setError('');
    onSave({
      ...form,
      categoryId: parseInt(form.categoryId),
      totalCopies: parseInt(form.totalCopies),
      availableCopies: parseInt(form.availableCopies),
    });
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label className="form-label">Tên sách *</label>
        <input name="title" className="form-control" value={form.title} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Tác giả *</label>
        <input name="author" className="form-control" value={form.author} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Thể loại *</label>
        <select name="categoryId" className="form-select" value={form.categoryId} onChange={handleChange}>
          <option value="">-- Chọn thể loại --</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="row mb-2">
        <div className="col">
          <label className="form-label">Tổng số</label>
          <input name="totalCopies" type="number" min="1" className="form-control" value={form.totalCopies} onChange={handleChange} />
        </div>
        <div className="col">
          <label className="form-label">Còn lại</label>
          <input name="availableCopies" type="number" min="0" className="form-control" value={form.availableCopies} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">URL ảnh bìa</label>
        <input name="coverImage" className="form-control" value={form.coverImage} onChange={handleChange} />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSubmit}>
          {book ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {book && <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>}
      </div>
    </div>
  );
}
