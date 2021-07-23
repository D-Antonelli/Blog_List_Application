const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((accu, next) => accu + next.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((max, next) => {
  if (next.likes > max.likes) {
    return next;
  }
  return max;
});

module.exports = { dummy, totalLikes, favoriteBlog };
