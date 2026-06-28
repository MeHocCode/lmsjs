import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import categoryService from '../../services/categoryService';

export default function MemberForm({ member, onSave, onCancel }) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Nam');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    categoryService.getAllCategories().then(setAvailableCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (member) {
      setFullname(member.name || ''); // member.name is populated from user.fullname in LibrarianMembersPage
      setEmail(member.email || '');
      setPassword(''); // Không hiển thị mật khẩu khi sửa
      setPhone(member.phone || '');
      setGender(member.gender || 'Nam');
      setDob(member.dob || '');
      setCity(member.city || '');
      setAddress(member.address || '');
      setFavorites(member.favorites || []);
    } else {
      setFullname('');
      setEmail('');
      setPassword('');
      setPhone('');
      setGender('Nam');
      setDob('');
      setCity('');
      setAddress('');
      setFavorites([]);
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname.trim() || !email.trim() || !phone.trim() || (!member && !password.trim())) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc (Họ tên, Email, Mật khẩu, Số điện thoại)!');
      return;
    }
    setError('');
    onSave({
      fullname, email, password, phone, gender, dob, city, address, favorites
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger p-2">{error}</div>}
      
      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Họ tên *</Form.Label>
        <Form.Control type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Email *</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!!member} />
      </Form.Group>

      {!member && (
        <Form.Group className="mb-2">
          <Form.Label className="fw-semibold">Mật khẩu *</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      )}

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Số điện thoại *</Form.Label>
        <Form.Control type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Giới tính</Form.Label>
        <div>
          <Form.Check inline type="radio" label="Nam" checked={gender === 'Nam'} onChange={() => setGender('Nam')} />
          <Form.Check inline type="radio" label="Nữ" checked={gender === 'Nữ'} onChange={() => setGender('Nữ')} />
        </div>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Ngày sinh</Form.Label>
        <Form.Control type="date" value={dob} onChange={e => setDob(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Thành phố</Form.Label>
        <Form.Select value={city} onChange={e => setCity(e.target.value)}>
          <option value="">-- Chọn thành phố --</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
          <option value="Cần Thơ">Cần Thơ</option>
          <option value="Hải Phòng">Hải Phòng</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fw-semibold">Địa chỉ</Form.Label>
        <Form.Control as="textarea" rows={2} value={address} onChange={e => setAddress(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Thể loại yêu thích</Form.Label>
        <div>
          {availableCategories.map(cat => (
            <Form.Check
              inline
              key={cat.id}
              type="checkbox"
              label={cat.name}
              checked={favorites.includes(cat.name)}
              onChange={(e) => {
                if (e.target.checked) setFavorites([...favorites, cat.name]);
                else setFavorites(favorites.filter(f => f !== cat.name));
              }}
            />
          ))}
        </div>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit" className="w-100">
          {member ? 'Cập nhật' : 'Thêm độc giả'}
        </Button>
        {member && (
          <Button variant="secondary" onClick={onCancel} className="w-100">
            Hủy / Thêm mới
          </Button>
        )}
      </div>
    </Form>
  );
}
