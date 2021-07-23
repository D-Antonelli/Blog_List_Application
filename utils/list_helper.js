const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((accu, current) => accu + current.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((max, current) => {
    if (current.likes > max.likes) {
      return current;
    }
    return max;
  });

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((array, current) => {
    const nameMatch = array.find((blog) => blog.author === current.author);
    if (nameMatch) {
      nameMatch.blogs += 1;
    } else {
      const result = { author: current.author, blogs: 1 };
      array.push(result);
    }
    return array;
  }, []);

  return authors.reduce((max, current) => {
    if (current.blogs > max.blogs) {
      return current;
    }
    return max;
  });
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((array, current) => {
    const nameMatch = array.find((blog) => blog.author === current.author);
    if (nameMatch) {
      nameMatch.likes += current.likes;
    } else {
      const result = { author: current.author, likes: current.likes };
      array.push(result);
    }
    return array;
  }, []);

  return authors.reduce((max, current) => {
    if (current.likes > max.likes) {
      return current;
    }
    return max;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
