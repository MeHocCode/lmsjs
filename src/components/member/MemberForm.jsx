import { useState, useEffect } from 'react';

export default function MemberForm({ member, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', userId: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
        userId: member.userId || ''
      });
    } else {
      setForm({ name: '', email: '', phone: '', userId: '' });
    }
  }, [member]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email, Số điện thoại)!');
      return;
    }
    setError('');
    onSave({
      ...form,
      userId: form.userId ? parseInt(form.userId) : null
    });
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label className="form-label">Họ tên *</label>
        <input name="name" className="form-control" value={form.name} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Email *</label>
        <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label className="form-label">Số điện thoại *</label>
        <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">User ID (Liên kết tài khoản)</label>
        <input name="userId" type="number" className="form-control" value={form.userId} onChange={handleChange} placeholder="Ví dụ: 2" />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleSubmit}>
          {member ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {member && <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>}
      </div>
    </div>
  );
}
