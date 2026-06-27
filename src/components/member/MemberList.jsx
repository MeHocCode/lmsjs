import DataTable from '../common/DataTable';

export default function MemberList({ members = [], onEdit, onDelete }) {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Họ tên' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'userId', label: 'User ID' }
  ];

  return (
    <DataTable 
      data={members} 
      columns={columns} 
      onEdit={onEdit} 
      onDelete={onDelete} 
    />
  );
}
