import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  useTheme,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';

// Mock data for comments
const mockComments = [
  {
    id: 1,
    author: {
      name: 'John Doe',
      avatar: '/images/avatars/user1.jpg',
    },
    content: 'Great insights! The AI trends are particularly interesting.',
    date: '2 hours ago',
    likes: 12,
    dislikes: 1,
    replies: [
      {
        id: 2,
        author: {
          name: 'Jane Smith',
          avatar: '/images/avatars/user2.jpg',
        },
        content: 'Totally agree! AI is revolutionizing digital marketing.',
        date: '1 hour ago',
        likes: 5,
        dislikes: 0,
      },
    ],
  },
  {
    id: 3,
    author: {
      name: 'Mike Wilson',
      avatar: '/images/avatars/user3.jpg',
    },
    content: 'Would love to see more examples of voice search optimization in practice.',
    date: '3 hours ago',
    likes: 8,
    dislikes: 0,
    replies: [],
  },
];

const CommentSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      author: {
        name: 'Guest User',
        avatar: '/images/avatars/default.jpg',
      },
      content: newComment,
      date: 'Just now',
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const CommentCard = ({ comment, isReply = false }) => (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 'none',
        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar src={comment.author.avatar} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {comment.author.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {comment.date}
              </Typography>
            </Box>
            <Typography variant="body2" paragraph>
              {comment.content}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                size="small"
                startIcon={<ThumbUpIcon />}
                sx={{ color: 'text.secondary' }}
              >
                {comment.likes}
              </Button>
              <Button
                size="small"
                startIcon={<ThumbDownIcon />}
                sx={{ color: 'text.secondary' }}
              >
                {comment.dislikes}
              </Button>
              {!isReply && (
                <Button
                  size="small"
                  startIcon={<ReplyIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  Reply
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ pl: 8, pr: 2, pb: 2 }}>
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </Box>
      )}
    </Card>
  );

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Comments ({comments.length})
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {/* Comment Form */}
      <Box
        component="form"
        onSubmit={handleSubmitComment}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!newComment.trim()}
        >
          Post Comment
        </Button>
      </Box>

      {/* Comments List */}
      <Box>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Box>
    </Box>
  );
};

export default CommentSection;