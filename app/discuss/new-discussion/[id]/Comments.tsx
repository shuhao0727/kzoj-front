"use client";

import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { ListGroup, Form, Button, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // 引入 Quill 样式
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

// 动态引入 Quill，因为它不支持 SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// 单条评论组件
const CommentItem = ({ comment, onReply, onLike, onDislike }) => {
  return (
    <ListGroup.Item className="mb-3">
      <div className="d-flex justify-content-between">
        <div>
          <strong>{comment.author}</strong> <span className="text-muted">{comment.date}</span>
          <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
        </div>
        <div className="d-flex align-items-center">
          <Button variant="link" className="text-success" onClick={onLike}>
            <FaThumbsUp /> {comment.likes}
          </Button>
          <Button variant="link" className="text-danger" onClick={onDislike}>
            <FaThumbsDown /> {comment.dislikes}
          </Button>
          <Button variant="link" className="text-primary" onClick={onReply}>
            <FaReply /> 回复
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

// 评论列表组件
const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "用户1",
      date: "2024-09-29",
      content: "这是第一条评论！",
      likes: 10,
      dislikes: 2,
    },
    {
      id: 2,
      author: "用户2",
      date: "2024-09-28",
      content: "我不同意你的观点。",
      likes: 5,
      dislikes: 1,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // 处理添加新评论
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "新用户",
          date: new Date().toLocaleDateString(),
          content: newComment,
          likes: 0,
          dislikes: 0,
        },
      ]);
      setNewComment("");
    }
  };

  // 处理插入表情
  const handleEmojiSelect = (emoji) => {
    setNewComment(newComment + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h5>评论区</h5>
        <ListGroup variant="flush">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={() => alert("回复功能待实现")}
              onLike={() => {
                setComments(
                  comments.map((c) =>
                    c.id === comment.id ? { ...c, likes: c.likes + 1 } : c
                  )
                );
              }}
              onDislike={() => {
                setComments(
                  comments.map((c) =>
                    c.id === comment.id ? { ...c, dislikes: c.dislikes + 1 } : c
                  )
                );
              }}
            />
          ))}
        </ListGroup>

        <Form className="mt-4">
          <Form.Group controlId="newComment">
            <Form.Label>添加评论</Form.Label>
            <ReactQuill
              value={newComment}
              onChange={setNewComment}
              placeholder="输入评论内容"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <Button variant="link" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                😄 表情
              </Button>
              {showEmojiPicker && <Picker onSelect={handleEmojiSelect} />}
            </div>
            <Button variant="primary" onClick={handleAddComment}>
              发表评论
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Comments;