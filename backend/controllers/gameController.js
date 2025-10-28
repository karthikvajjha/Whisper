import User from "../models/User.js";

const updateScore = async (req, res) => {
  try {
    const { change } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.gameScore += change;
    user.gamesPlayed += 1; 
    await user.save();

    return res.status(200).json({ msg: "Score updated successfully", user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const resetScore = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.gameScore = 0;
    user.gamesPlayed = 0;
    await user.save();

    return res.status(200).json({ msg: "Score reset successfully", user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};



const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({}, "username gameScore gamesPlayed")
      .sort({ gameScore: -1 })
      .limit(10);
    return res.status(200).json({topUsers});
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { updateScore, resetScore , getLeaderboard};

