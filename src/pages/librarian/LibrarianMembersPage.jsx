import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import memberService from '../../services/memberService';
import MemberList from '../../components/member/MemberList';
import Sidebar from '../../components/common/Sidebar';
import MemberForm from '../../components/member/MemberForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function LibrarianMembersPage() {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await memberService.getAllMembers();
      setMembers(data);
    } catch {
      toast.error('Không thể tải danh sách độc giả!');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(true);
  }, []);

  const handleSave = async (data) => {
    try {
      if (selected) {
        // Cập nhật User
        await api.patch(`/users/${selected.userId}`, {
          fullname: data.fullname,
          email: data.email,
          ...(data.password ? { password: data.password } : {})
        });
        // Cập nhật Member
        await memberService.updateMember(selected.id, {
          phone: data.phone,
          gender: data.gender,
          dob: data.dob,
          city: data.city,
          address: data.address,
          favorites: data.favorites
        });
        toast.success('Cập nhật độc giả thành công!');
      } else {
        // Kiểm tra email
        const exist = await api.get(`/users?email=${data.email}`);
        if (exist.data.length > 0) {
          toast.error('Email này đã được sử dụng!');
          return;
        }
        // Tạo User mới
        const newUserRes = await api.post('/users', {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
          role: 'member'
        });
        // Tạo Member
        await memberService.createMember({
          userId: newUserRes.data.id,
          phone: data.phone,
          gender: data.gender,
          dob: data.dob,
          city: data.city,
          address: data.address,
          favorites: data.favorites || []
        });
        toast.success('Thêm độc giả mới thành công!');
      }
      setSelected(null);
      fetchMembers(false);
    } catch {
      toast.error('Có lỗi xảy ra khi lưu độc giả!');
    }
  };

  const handleDelete = async (id, userId) => {
    try {
      await memberService.deleteMember(id);
      if (userId) {
        await api.delete(`/users/${userId}`);
      }
      toast.success('Xóa độc giả thành công!');
      if (selected && selected.id === id) setSelected(null);
      fetchMembers(false);
    } catch {
      toast.error('Không thể xóa độc giả!');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-3">Quản lý độc giả</h2>
            <MemberList 
              members={members} 
              onEdit={setSelected} 
              onDelete={handleDelete} 
            />
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5>{selected ? 'Sửa độc giả' : 'Thêm độc giả'}</h5>
              <MemberForm 
                member={selected} 
                onSave={handleSave} 
                onCancel={() => setSelected(null)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
