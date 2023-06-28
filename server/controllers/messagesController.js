const messageModel = require("../model/messageModel");

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json("message sent");
    }
    return res.json("message sent failed");
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    console.log("arre", from, to);

    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      },
    });
    // .sort({ updatedAt: 1 });

    console.log("helloo", messages);

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
