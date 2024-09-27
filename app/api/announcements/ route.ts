import { NextResponse } from "next/server";

interface Announcement {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  author: string;
  visible: boolean;
}

// 模拟公告存储（可替换为数据库操作）
let announcements: Announcement[] = [
  {
    id: 7,
    title: "实名制公告",
    content: "这是实名制公告内容...",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    author: "root",
    visible: true,
  },
  {
    id: 5,
    title: "喜报! 2023年NOIP竞赛获奖情况",
    content: "这是NOIP竞赛获奖公告内容...",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    author: "root",
    visible: true,
  },
];

// 获取所有公告 (GET)
export async function GET() {
  return NextResponse.json(announcements);
}

// 创建新公告 (POST)
export async function POST(req: Request) {
  const body = await req.json();
  const newAnnouncement = {
    id: announcements.length + 1,
    ...body,
    author: "root",
    visible: true,
  };

  announcements.push(newAnnouncement);
  return NextResponse.json(newAnnouncement, { status: 201 });
}

// 更新公告 (PUT)
export async function PUT(req: Request) {
  const body = await req.json();
  const id = body.id;

  const updatedAnnouncements = announcements.map((announcement) =>
    announcement.id === id ? { ...announcement, ...body } : announcement
  );

  announcements = updatedAnnouncements;
  return NextResponse.json(body);
}

// 删除公告 (DELETE)
export async function DELETE(req: Request) {
  const { id } = await req.json();
  announcements = announcements.filter((announcement) => announcement.id !== id);
  return NextResponse.json({ message: "删除成功" });
}