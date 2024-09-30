"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  TextField,
  Card,
} from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// 动态加载 ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// 去除 HTML 标签的函数
const stripHtmlTags = (htmlContent) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  return tempDiv.innerText; // 只提取纯文本内容
};

// 单条评论组件，递归处理回复
const CommentItem = ({
  comment,
  onReplySubmit,
  onLike,
  onDislike,
  handleReply,
  replyContent,
  setReplyContent,
  replyTo,
  comments,
  onDelete, // 删除评论的函数
}) => {
  // 过滤出当前评论的回复
  const replies = comments.filter((c) => c.parentId === comment.id);

  return (
    <ListItem sx={{ flexDirection: "column", alignItems: "flex-start", pl: comment.parentId ? 4 : 0 }}>
      {/* 评论内容和操作 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {comment.content}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {comment.author} - {comment.date}
        </Typography>
      </Box>

      {/* 点赞、踩和删除按钮 */}
      <Box sx={{ mt: 1 }}>
        <Button size="small" sx={{ minWidth: "50px" }} onClick={onLike}>
          点赞 {comment.likes}
        </Button>
        <Button size="small" sx={{ minWidth: "50px" }} onClick={onDislike}>
          踩 {comment.dislikes}
        </Button>
        <Button size="small" onClick={() => handleReply(comment.id)}>
          回复
        </Button>
        {comment.isAdmin && ( // 只有管理员可以看到删除按钮
          <Button size="small" onClick={() => onDelete(comment.id)} sx={{ color: "red" }}>
            删除
          </Button>
        )}
      </Box>

      {/* 如果当前评论正在回复，则显示回复框 */}
      {replyTo === comment.id && (
        <Box sx={{ mt: 2, width: "100%" }}>
          <TextField
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            fullWidth
            size="small"
            placeholder="输入回复内容..."
          />
          <Button
            onClick={() => onReplySubmit(comment.id)}
            variant="contained"
            size="small"
            sx={{ mt: 1 }}
          >
            提交回复
          </Button>
        </Box>
      )}

      {/* 递归渲染回复 */}
      <List sx={{ width: "100%" }}>
        {replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onReplySubmit={onReplySubmit}
            onLike={() => {}}
            onDislike={() => {}}
            handleReply={handleReply}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            replyTo={replyTo}
            comments={comments}
            onDelete={onDelete} // 传递删除函数
          />
        ))}
      </List>
    </ListItem>
  );
};

// 评论组件
const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "用户1",
      date: "2024-09-29",
      content: "这是第一条评论！",
      parentId: null,
      likes: 10,
      dislikes: 2,
      isAdmin: true, // 设置为管理员
    },
    {
      id: 2,
      author: "用户2",
      date: "2024-09-28",
      content: "我不同意你的观点。",
      parentId: null,
      likes: 5,
      dislikes: 1,
      isAdmin: false, // 设置为普通用户
    },
    {
      id: 3,
      author: "用户3",
      date: "2024-09-29",
      content: "这是对第一条评论的回复。",
      parentId: 1,
      likes: 3,
      dislikes: 0,
      isAdmin: false,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null); // 当前回复的评论 ID
  const [replyContent, setReplyContent] = useState(""); // 回复框内容

  // 添加新评论
  const handleAddComment = () => {
    if (newComment.trim()) {
      const strippedContent = stripHtmlTags(newComment); // 将内容转为纯文本
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "新用户",
          date: new Date().toLocaleDateString(),
          content: strippedContent, // 添加纯文本内容
          parentId: null, // 顶层评论 parentId 为 null
          likes: 0,
          dislikes: 0,
          isAdmin: false, // 新用户默认为普通用户
        },
      ]);
      setNewComment(""); // 清空评论输入框
    }
  };

  // 提交回复
  const handleReplySubmit = (parentId) => {
    if (replyContent.trim()) {
      const strippedReplyContent = stripHtmlTags(replyContent); // 将回复内容转为纯文本
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "新用户",
          date: new Date().toLocaleDateString(),
          content: strippedReplyContent, // 回复纯文本内容
          parentId, // 设置父级评论 ID
          likes: 0,
          dislikes: 0,
          isAdmin: false, // 回复者默认为普通用户
        },
      ]);
      setReplyTo(null); // 关闭回复输入框
      setReplyContent(""); // 清空回复内容
    }
  };

  // 设置要回复的评论 ID
  const handleReply = (id) => {
    setReplyTo(id);
    setReplyContent(""); // 清空之前的回复内容
  };

  // 删除评论
  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <Card sx={{ p: 2, mt: 4 }}>
      {/* 评论输入框 */}
      <Box sx={{ mb: 4 }}>
        <ReactQuill
          value={newComment}
          onChange={setNewComment}
          placeholder="输入评论内容"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link", "image"],
            ],
          }}
        />
        <Button
          onClick={handleAddComment}
          variant="contained"
          color="primary"
          size="small"
          sx={{ mt: 2 }}
        >
          发表评论
        </Button>
      </Box>

      {/* 渲染评论列表 */}
      <List>
        {comments
          .filter((comment) => comment.parentId === null) // 只渲染顶层评论
          .map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplySubmit={handleReplySubmit}
              onLike={() => {}}
              onDislike={() => {}}
              handleReply={handleReply}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              replyTo={replyTo}
              comments={comments} // 传递所有评论数据用于递归处理回复
              onDelete={handleDelete} // 传递删除函数
            />
          ))}
      </List>
    </Card>
  );
};

export default Comments;