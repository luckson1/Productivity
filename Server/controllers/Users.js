const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../middlewear/generateTokens");
const User = require("../models/Users");
const cloudinary = require("../utils/cloudinary");
const { v4: uuidv4 } = require("uuid");
var nodemailer = require("nodemailer");

// Create the transporter with the required configuration for Outlook
var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "gathondudev@outlook.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

// registering a user

const registerUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userId = uuidv4();

  // generate token
  const token = generateToken(userId);

  //find if a user exists

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  try {
    // if new, create one
    const user = await User.create({
      email,
      password,
      userId,
      status: "Pending",
    });

    const token = generateToken(userId);
    res.json({ user, token });
  } catch (error) {
    res.json({ error });
  }
});

// login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const user = await User.findOne({ email });

  //Check if password is match
  if (user && (await user?.isPasswordMatch(password))) {
    res.json({
      token: generateToken(user?.userId),
      user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

// create profile

const createProfileCtrl = expressAsyncHandler(async (req, res) => {
  const id = req?.user?.id;

  const filePath = req?.file?.path;
  // upload file to cloudinary
  const result = await cloudinary.uploader.upload(filePath);

  // get url of uploaded image
  const image = result?.secure_url;

  const { firstName, lastName } = req?.body;

  const updateDocument = {
    $set: {
      firstName: firstName,
      lastName: lastName,
      image: image,
      status: "Approved",
    },
  };

  try {
    const user = await User.findByIdAndUpdate(id, updateDocument);

    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});

//update user detals
const upDateProfileCtrl = expressAsyncHandler(async (req, res) => {
  const id = req?.user?.id;

  const { firstName, lastName } = req?.body;

  const updateDocument = {
    $set: {
      firstName: firstName,
      lastName: lastName,
    },
  };

  try {
    const user = await User.findByIdAndUpdate(id, updateDocument);

    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});

// fetch one user

const fetchUserCtrl = expressAsyncHandler(async (req, res) => {
  const id = req?.user?.id;

  try {
    const user = await User.findById(id);
    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});

// create a new account by admin
const createUserctrl = expressAsyncHandler(async (req, res) => {
  const { email, firstName, userId, role, team } = req.body;
  let domain = "https://techivity.netlify.app";
  const id = req?.user?.userId;

  // Make sure this account doesn't already exist
  //find if a user exists
  const userExists = await User.findOne({ email });

  // find if existing user has been invited by the admin(invite sender) before.
  invitingAdminsIds = userExists?.invitedBy;

  const alreadyTeamMember = invitingAdminsIds?.includes(id);
  if (alreadyTeamMember) {
    throw new Error("Team member already invited!");
  }
  if (userExists && !alreadyTeamMember) {
    // adding user to the team(by adding the invite sender userId to the list of invitedBy array), if user exists but not added to the request-sender's team
    const updateDocument1 = {
      $push: { invitedBy: id },
    };

    try {
      const user = await User.findByIdAndUpdate(
        userExists?._id,
        updateDocument1
      );
      // setup e-mail data
      var mailOptions = {
        from: '"Techivity " <gathondudev@outlook.com>', // sender address (who sends)
        to: email, // list of receivers (who receives)
        subject: "Added to a team", // Subject line
        text: "Hello", // plaintext body
        html: `<p>Hello ${firstName}<p><br><p>You were addded to a new team on ${domain}. <p>If you did not request this, please ignore this email.</p>`, // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }

        console.log("Message sent: " + info.response);
      });

      //save user
      await user.save();
      res.json({ user });
    } catch (error) {
      res.json({ error });
    }
  } else {
    // if user does not exist, create and save user

    try {
      const password = uuidv4(); //generate a random password
      const invitedBy = id;
      const teams = [team];
      const newUser = await User.create({
        invitedBy,
        email,
        password,
        userId,
        role,
        status: "Pending",
        teams,
        firstName,
      });

      // setup e-mail data
      var mailOptions = {
        from: '"Techivity " <gathondudev@outlook.com>', // sender address (who sends)
        to: email, // list of receivers (who receives)
        subject: "New Account Created", // Subject line
        text: "Hello", // plaintext body
        html: `<p>Hello ${firstName}<p><br><p>A new account has been created for you on ${domain}. Please use <br>username: <strong>${email} <strong> and password: <strong>${password} <strong><br>  to login.</p> 
            <br><p>If you did not request this, please ignore this email.</p>`, // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }

        console.log("Message sent: " + info.response);
      });
      return res.json({ newUser });
    } catch (error) {
      res.json({ error });
    }
  }
});

//find members belonging to ateam created by sender
const fetchTeamMembersCtrl = expressAsyncHandler(async (req, res) => {
  const inviteSenderId = req?.user?.userId;

  try {
    const teamMembers = await User.aggregate([
      {
        $match: {
          $or: [{ invitedBy: inviteSenderId }, { userId: inviteSenderId }],
        },
      },
    ]);

    res.json({ teamMembers });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = {
  fetchTeamMembersCtrl,
  registerUserCtrl,
  loginUserCtrl,
  createProfileCtrl,
  fetchUserCtrl,
  upDateProfileCtrl,
  createUserctrl,
};
