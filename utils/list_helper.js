const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((accu, next) => accu + next.likes, 0);

module.exports = { dummy, totalLikes };
