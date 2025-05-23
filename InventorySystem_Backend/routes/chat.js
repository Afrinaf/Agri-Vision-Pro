// const express = require("express");
// const router = express.Router();
// const Message = require("../models/Message");
// const Bid = require("../models/Bid");
// const Post = require("../models/Post");
// const fetchUser = require("../middleware/fetchUser");

// // Send a message
// router.post("/send", fetchUser, async (req, res) => {
//     try {
//         const { receiverId, postId, bidId, message } = req.body;
//         const senderId = req.user.id;

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             postId,
//             bidId,
//             message,
//         });
//         await newMessage.save();

//         res.status(201).json({ success: true, message: "Message sent successfully." });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Fetch messages for a specific chat (farmer & buyer conversation on a post)
// router.get("/fetch/:postId/:bidId", fetchUser, async (req, res) => {
//     try {
//         const { postId, bidId } = req.params;
//         const messages = await Message.find({ postId, bidId }).sort("timestamp");

//         res.status(200).json({ success: true, messages });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// router.get("/list", fetchUser, async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Find bids where the user is involved either as buyer or as the post owner (farmer)
//         const bids = await Bid.find({
//             $or: [
//                 { userId },
//                 { postId: { $in: await Post.find({ userId }).distinct("_id") } },
//             ],
//         })
//             .populate({
//                 path: "postId",
//                 select: "postTitle unit userId",
//                 populate: { path: "userId", select: "name profilepicture" },
//             })
//             .populate("userId", "name profilepicture");

//         // Build chat objects with profile picture
//         const chats = bids.map((bid) => {
//             let chatTitle = "";
//             let profilepicture = "";

//             if (bid.userId._id.toString() === userId) {
//                 // Buyer (bid placer) view: show farmer's name (from post) + post title
//                 chatTitle = `${bid.postId.userId.name} - ${bid.postId.postTitle}`;
//                 profilepicture = bid.postId.userId.profilepicture || null;
//             } else {
//                 // Farmer view: show buyer's name + post title
//                 chatTitle = `${bid.userId.name} - ${bid.postId.postTitle}`;
//                 profilepicture = bid.userId.profilepicture || null;
//             }

//             return {
//                 bidId: bid._id,
//                 postId: bid.postId._id,
//                 postTitle: bid.postId.postTitle,
//                 bidAmount: bid.bidAmount,
//                 unit: bid.postId.unit,
//                 receiverId:
//                     bid.userId._id.toString() === userId
//                         ? bid.postId.userId._id
//                         : bid.userId._id,
//                 chatTitle,
//                 unreadCount: 0,
//                 profilepicture, // Send profile picture URL
//             };
//         });

//         res.json({ chats });
//     } catch (error) {
//         console.error("Error fetching chats:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// });



// router.post("/markAsRead/:bidId", fetchUser, async (req, res) => {
//     try {
//         const { bidId } = req.params;
//         await Message.updateMany(
//             { bidId, receiverId: req.user.id, isRead: false },
//             { $set: { isRead: true } }
//         );
//         res.json({ success: true, message: "Messages marked as read." });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });



// module.exports = router;


const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Bid = require("../models/Bid");
const Post = require("../models/Post");
const fetchUser = require("../middleware/fetchUser");

// Send a message
router.post("/send", fetchUser, async (req, res) => {
  try {
    const { receiverId, postId, bidId, message } = req.body;
    const senderId = req.user.id;

    const newMessage = new Message({
      senderId,
      receiverId,
      postId,
      bidId,
      message,
    });
    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fetch messages for a specific chat (farmer & buyer conversation on a post)
router.get("/fetch/:postId/:bidId", fetchUser, async (req, res) => {
  try {
    const { postId, bidId } = req.params;
    const messages = await Message.find({ postId, bidId }).sort("timestamp");

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// List chats (for both Buyer & Farmer)
router.get("/list", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find bids where the user is either the buyer or the post owner (farmer)
    // Look up post IDs where the current user is the owner (farmer)
    const postsByUser = await Post.find({ userId }).distinct("_id");

    const bids = await Bid.find({
      $or: [{ userId }, { postId: { $in: postsByUser } }],
    })
      .populate({
        path: "postId",
        select: "postTitle unit userId",
        populate: { path: "userId", select: "name profilepicture" },
      })
      .populate("userId", "name profilepicture");

    // If no bids are found, return an empty array.
    if (!bids || bids.length === 0) {
      return res.json({ chats: [] });
    }

    const chats = bids
      .map((bid) => {
        // Check that bid has valid post and user properties
        if (
          !bid ||
          !bid.postId ||
          !bid.postId.userId ||
          !bid.userId ||
          !bid.postId.postTitle
        ) {
          return null; // Skip this record if incomplete
        }

        const isBuyer = bid.userId._id.toString() === userId.toString();
        let chatTitle = "";
        let profilepicture = "";

        if (isBuyer) {
          // Buyer view: show farmer's name (from the post) and post title.
          chatTitle = `${bid.postId.userId.name} - ${bid.postId.postTitle}`;
          profilepicture = bid.postId.userId.profilepicture || null;
        } else {
          // Farmer view: show buyer's name and post title.
          chatTitle = `${bid.userId.name} - ${bid.postId.postTitle}`;
          profilepicture = bid.userId.profilepicture || null;
        }

        return {
          bidId: bid._id,
          postId: bid.postId._id,
          postTitle: bid.postId.postTitle,
          bidAmount: bid.bidAmount,
          unit: bid.postId.unit,
          // Receiver ID is set to the other party's ID
          receiverId: isBuyer
            ? bid.postId.userId._id
            : bid.userId._id,
          chatTitle,
          unreadCount: 0,
          profilepicture,
        };
      })
      .filter((chat) => chat !== null); // Remove any null entries

    res.json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Mark messages as read
router.post("/markAsRead/:bidId", fetchUser, async (req, res) => {
  try {
    const { bidId } = req.params;
    await Message.updateMany(
      { bidId, receiverId: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ success: true, message: "Messages marked as read." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
