import DataTable from '../common/DataTable';

export default function MemberList({ members = [], onEdit, onDelete }) {
  const columns = [
    { key: 'name', label: 'Họ tên' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'gender', label: 'Giới tính' },
    { key: 'city', label: 'Thành phố' }
  ];

  const handleDelete = (id) => {
    const member = members.find(m => m.id === id);
    onDelete(id, member?.userId);
  };

  return (
    <DataTable 
      data={members} 
      columns={columns} 
      onEdit={onEdit} 
      onDelete={handleDelete} 
    />
  );
}
