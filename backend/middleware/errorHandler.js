// Centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message || 'File upload error' });
  }
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
