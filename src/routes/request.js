const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../utils/middleWares/auth");
const user = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowed = ["ignored", "interested"];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: `invalid status type..! +` });
      }

      const toUser = await user.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "user not found..!" });
      }

      const existingConnectionReq = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnectionReq) {
        return res
          .status(400)
          .send({ message: `connection is already exists..!` });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + ` is ` + status + " the " + toUser.firstName,
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).send("Error fetching the user: " + error.message);
    }
  }
);

module.exports = requestRouter;
