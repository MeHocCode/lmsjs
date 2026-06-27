import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import memberService from '../../services/memberService';
import MemberList from '../../components/member/MemberList';
import Sidebar from '../../components/common/Sidebar';
import MemberForm from '../../components/member/MemberForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function LibrarianMembersPage() {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await memberService.getAllMembers();
      setMembers(data);
    } catch {
      toast.error('Không thể tải danh sách độc giả!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async (data) => {
    try {
      if (selected) {
        await memberService.updateMember(selected.id, data);
      } else {
        await memberService.createMember(data);
      }
      toast.success(selected ? 'Cập nhật độc giả thành công!' : 'Thêm độc giả mới thành công!');
      setSelected(null);
      fetchMembers();
    } catch {
      toast.error('Có lỗi xảy ra khi lưu độc giả!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await memberService.deleteMember(id);
      toast.success('Xóa độc giả thành công!');
      fetchMembers();
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
