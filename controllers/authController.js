const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const usuarioExist = await User.exists({ username });
		console.log(usuarioExist);
		if (usuarioExist) {
			return res.status(400).json({ message: "User already exists" });
		}
		const newUser = new User({ username, password });
		await newUser.save();
		const token = jwt.sign({ id: newUser._id }, "secretKey", {
			expiresIn: "1h",
		});
        console.log(`User ${username} registered successfully`);
		res.status(201).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password or user incorrect" });
        }

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "3h" });

        console.log(`User ${username} logged in successfully`);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

