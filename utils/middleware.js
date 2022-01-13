const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    request.token = token;
  }
  return null;
};

module.exports = getTokenFrom;
