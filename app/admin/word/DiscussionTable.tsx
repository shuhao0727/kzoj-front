import Link from 'next/link';

const discussions = [
  { id: 1, title: '讨论 1', author: '用户1', createdAt: '2024-09-01' },
  { id: 2, title: '讨论 2', author: '用户2', createdAt: '2024-09-02' },
  { id: 3, title: '讨论 3', author: '用户3', createdAt: '2024-09-03' },
];

const DiscussionTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>作者</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {discussions.map((discussion) => (
          <tr key={discussion.id}>
            <td>{discussion.id}</td>
            <td>{discussion.title}</td>
            <td>{discussion.author}</td>
            <td>{discussion.createdAt}</td>
            <td>
              <Link href={`/discussion/${discussion.id}`}>
                查看
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiscussionTable;