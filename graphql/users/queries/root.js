module.exports = {
  user: (parent, args, { models: { User } }) => {
    return User.findByPk(args.id);
  },
  users: (parent, args, { models }) => {
    const { User } = models;
    // let pagination = {};
    // if (args && args.page) {
    //     let { page, size } = args;
    //     // calculating offset
    //     const offset = (+page - 1) * +size;
    //     pagination = { offset: offset, limit: +size };
    // }

    return User.findAll({
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"]
      ]
      // ...pagination
    });
  }
};
