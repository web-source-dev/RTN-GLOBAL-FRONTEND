import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
  useTheme,
  Fade
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  Reply,
  ExpandMore,
  ExpandLess,
  Share,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [replyText, setReplyText] = useState({});
  const [expandedComment, setExpandedComment] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [commentLikes, setCommentLikes] = useState({});
  const [visibleComments, setVisibleComments] = useState(2);
  const [expandedReplies, setExpandedReplies] = useState({});
  useEffect(() => {
    fetchBlogAndComments();
  }, [id]);

  const fetchBlogAndComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
      
      if (!response.ok) {
        throw new Error('Blog not found');
      }
      
      const data = await response.json();
      setBlog(data);
      setComments(data.comments || []);
      fetchRelatedBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`);
      if (response.ok) {
        const data = await response.json();
        setRelatedBlogs(data.filter(b => b._id !== id).slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching related blogs:', err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(prev => ({
          ...prev,
          ...updatedBlog,
          author: prev.author
        }));
      }
    } catch (err) {
      setError('Failed to like blog');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: comment }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setComment('');
      }
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  const handleReply = async (commentId) => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/blogs/${id}/comments/${commentId}/replies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content: replyText[commentId] }),
        }
      );
      if (response.ok) {
        fetchBlogAndComments();
        setReplyText({ ...replyText, [commentId]: '' });
      }
    } catch (err) {
      setError('Failed to post reply');
    }
  };

  const handleCommentLike = async (commentId) => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/blogs/${id}/comments/${commentId}/like`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.ok) {
        const updatedComment = await response.json();
        setComments(comments.map(c => {
          if (c._id === commentId) {
            return {
              ...c,
              ...updatedComment,
              user: c.user,
              replies: c.replies.map(r => ({
                ...r,
                user: r.user
              }))
            };
          }
          return c;
        }));
      }
    } catch (err) {
      setError('Failed to like comment');
    }
  };

  const handleShare = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {

  const blogUrl = `${window.location.origin}/blogs/${id}`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Check out this blog!',
        url: blogUrl,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    try {
      await navigator.clipboard.writeText(blogUrl);
      alert('Blog link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/blogs/${id}/share`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(prev => ({
          ...prev,
          ...updatedBlog,
          author: prev.author
        }));
      }
    } catch (err) {
      setError('Failed to share blog');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!blog) return null;

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 3, md: 5 },
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              {blog.image && (
                <Box 
                  sx={{ 
                    mb: 4,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}${blog.image}`}
                    alt={blog.title}
                    style={{ 
                      width: '100%', 
                      maxHeight: '500px', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  />
                </Box>
              )}

              <Typography 
                variant="h2" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: 'primary.main'
                }}
              >
                {blog.title}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4, 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={blog.author?.avatar} 
                    alt={blog.author?.firstName}
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography 
                      variant="subtitle1"
                      sx={{ fontWeight: 600 }}
                    >
                      {`${blog.author?.firstName} ${blog.author?.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(blog.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  bgcolor: 'background.paper',
                  p: 1,
                  borderRadius: 1,
                  boxShadow: 1
                }}>
                  <Visibility color="primary" />
                  <Typography variant="body2">
                    {blog.views} views
                  </Typography>
                </Box>
              </Box>

              <Typography 
                variant="body1" 
                component="div"
                sx={{ 
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'text.primary'
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3,
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 2,
                boxShadow: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    onClick={handleLike}
                    sx={{ 
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    {blog.likes?.includes(user?._id) ? 
                      <ThumbUp color="primary" /> : 
                      <ThumbUpOutlined />}
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {blog.likes?.length || 0} likes
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    onClick={handleShare}
                    sx={{ 
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    <Share color={blog.shares?.includes(user?._id) ? "primary" : "inherit"} />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {blog.shares?.length || 0} shares
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 5 }} />

              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: 'primary.main'
                }}
              >
                Comments
              </Typography>

              {user ? (
                <Box 
                  component="form" 
                  onSubmit={handleComment} 
                  sx={{ 
                    mb: 4,
                    mt: 3,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 1
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ 
                      mt: 2,
                      px: 4,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                    disabled={!comment.trim()}
                  >
                    Post Comment
                  </Button>
                </Box>
              ) : (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 4,
                    borderRadius: 2
                  }}
                >
                  Please <Button 
                    onClick={() => navigate('/auth/login')}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 600,
                      mx: 1
                    }}
                  >login</Button> to comment
                </Alert>
              )}

              <List sx={{ mt: 2 }}>
                {comments.slice(0, visibleComments).map((comment) => (
                  <React.Fragment key={comment._id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{ 
                        mb: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1,
                        p: 2
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          src={comment.user?.avatar} 
                          alt={comment.user?.firstName}
                          sx={{ width: 40, height: 40 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography 
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {`${comment.user?.firstName} ${comment.user?.lastName}`}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography 
                              variant="body2" 
                              paragraph
                              sx={{ 
                                mt: 1,
                                color: 'text.primary',
                                lineHeight: 1.6
                              }}
                            >
                              {comment.content}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                  onClick={() => handleCommentLike(comment._id)}
                                  size="small"
                                >
                                  {comment.likes?.includes(user?._id) ? 
                                    <ThumbUp fontSize="small" color="primary" /> : 
                                    <ThumbUpOutlined fontSize="small" />}
                                </IconButton>
                                <Typography variant="caption">
                                  {comment.likes?.length || 0}
                                </Typography>
                              </Box>
                              <Button
                                size="small"
                                startIcon={<Reply />}
                                onClick={() => setExpandedComment(expandedComment === comment._id ? null : comment._id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Reply
                              </Button>
                            </Box>
                            
                            <Collapse in={expandedComment === comment._id}>
                              <Box sx={{ mt: 2, ml: 2 }}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  placeholder="Write a reply..."
                                  value={replyText[comment._id] || ''}
                                  onChange={(e) => setReplyText({ ...replyText, [comment._id]: e.target.value })}
                                  sx={{ mb: 1 }}
                                />
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => handleReply(comment._id)}
                                  disabled={!replyText[comment._id]?.trim()}
                                  sx={{ textTransform: 'none' }}
                                >
                                  Post Reply
                                </Button>
                              </Box>
                            </Collapse>

                            {comment.replies && comment.replies.length > 0 && (
                              <Box sx={{ mt: 2 }}>
                                {comment.replies.slice(0, expandedReplies[comment._id] ? undefined : 1).map((reply) => (
                                  <Box
                                    key={reply._id}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: 1,
                                      mb: 1,
                                      ml: 2
                                    }}
                                  >
                                    <Avatar
                                      src={reply.user?.avatar}
                                      alt={reply.user?.firstName}
                                      sx={{ width: 32, height: 32 }}
                                    />
                                    <Box>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {`${reply.user?.firstName} ${reply.user?.lastName}`}
                                      </Typography>
                                      <Typography variant="body2">{reply.content}</Typography>
                                    </Box>
                                  </Box>
                                ))}
                                {comment.replies.length > 1 && (
                                  <Button
                                    size="small"
                                    onClick={() => setExpandedReplies(prev => ({
                                      ...prev,
                                      [comment._id]: !prev[comment._id]
                                    }))}
                                    sx={{ ml: 2, textTransform: 'none' }}
                                  >
                                    {expandedReplies[comment._id] ? 'Show Less' : `View ${comment.replies.length - 1} more replies`}
                                  </Button>
                                )}
                              </Box>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              {comments.length > visibleComments && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setVisibleComments(prev => prev + 5)}
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Load More Comments
                </Button>
              )}
              <Collapse in={expandedComment === comment._id}>
                <Box sx={{ 
                  pl: 7, 
                  pr: 2, 
                  pb: 2,
                  mt: -1,
                  mb: 2
                }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a reply..."
                    value={replyText[comment._id] || ''}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [comment._id]: e.target.value })
                    }
                    sx={{ 
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1
                      }
                    }}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ 
                      mt: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 1
                    }}
                    onClick={() => handleReply(comment._id)}
                    disabled={!replyText[comment._id]?.trim()}
                  >
                    Post Reply
                  </Button>
                </Box>
              </Collapse>
              {comment.replies?.map((reply) => (
                <Box 
                  key={reply._id} 
                  sx={{ 
                    pl: 7, 
                    pr: 2, 
                    pb: 2,
                    ml: 2
                  }}
                >
                  <ListItem 
                    alignItems="flex-start"
                    sx={{ 
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                      p: 1.5,
                      mb: 1
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={reply.user?.avatar}
                        alt={reply.user?.firstName}
                        sx={{ width: 32, height: 32 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {`${reply.user?.firstName} ${reply.user?.lastName}`}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography 
                            variant="body2"
                            sx={{ 
                              mt: 0.5,
                              color: 'text.primary',
                              lineHeight: 1.6
                            }}
                          >
                            {reply.content}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ mt: 1, display: 'block' }}
                          >
                            {new Date(reply.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </Box>
                ))}
            </Paper>
            </Grid>

        {/* Related Blogs Sidebar */}
        <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                position: 'sticky',
                top: 24,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3
                }}
              >
                Related Posts
              </Typography>
              {relatedBlogs.map((relatedBlog) => (
                <Card 
                  key={relatedBlog._id} 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                >
                  {relatedBlog.image && (
                    <Box
                      component="img"
                      src={`${process.env.REACT_APP_API_URL}${relatedBlog.image}`}
                      alt={relatedBlog.title}
                      sx={{ 
                        width: '100%', 
                        height: 140, 
                        objectFit: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 2 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.3
                      }}
                    >
                      {relatedBlog.title}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/blog/post/${relatedBlog._id}`);
                        window.scrollTo(0, 0);
                      }}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600,
                        mt: 1,
                        '&:hover': {
                          backgroundColor: 'primary.light'
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Paper>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default BlogPost;