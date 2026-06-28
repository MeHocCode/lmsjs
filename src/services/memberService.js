import api from './api';

const memberService = {
  getAllMembers: async () => {
    const [membersRes, usersRes] = await Promise.all([
      api.get('/members'),
      api.get('/users')
    ]);
    const users = usersRes.data;
    return membersRes.data.map(m => {
      const user = users.find(u => u.id === m.userId);
      return {
        ...m,
        name: user?.fullname || 'N/A',
        email: user?.email || 'N/A'
      };
    });
  },
  getMemberByUserId: async (userId) => {
    const data = (await api.get(`/members?userId=${userId}`)).data;
    const m = data[0];
    if (!m) return null;
    const userRes = await api.get(`/users/${userId}`);
    return { ...m, name: userRes.data?.fullname || 'N/A', email: userRes.data?.email || 'N/A' };
  },
  createMember: async (data) => (await api.post('/members', data)).data,
  updateMember: async (id, data) => (await api.put(`/members/${id}`, data)).data,
  deleteMember: async (id) => { await api.delete(`/members/${id}`); return true; },
};

export default memberService;
