// const expressAsyncHandler = require("express-async-handler");
// const Team = require("../models/Teams");
// require("dotenv").config();

// //create team

// const createTeamCtrl = expressAsyncHandler(async (req, res) => {
//     const teamCreator = req.user._id;
//     const teamCreatorEmail = req.user.email;
//     const { name, description, teamId } = req.body;
//     const teamMembers = [teamCreatorEmail];
//     try {
//         const team = await Team.create({
//             name,
//             description,
//             teamCreator,
//             teamId,
//             teamMembers,
//         });

//         res.json({ team });
//     } catch (error) {
//         res.json({ error });
//     }
// });

// // fetch all teams

// const fetchAllTeams = expressAsyncHandler(async (req, res) => {
//     try {
//         const teams = await Team.find({});

//         res.json({ teams });
//     } catch (error) {
//         res.json({ error });
//     }
// });

// // fetch all teams a user is part of

// const fetchUserTeams = expressAsyncHandler(async (req, res) => {
//     const userEmail = req.user.email;

//     try {
//         const teams = await Team.find({ teamMembers: { $in: [userEmail] } });

//         res.json({ teams });
//     } catch (error) {
//         res.json({ error });
//     }
// });

// // fetch one team

// const fetchOneTeamCtrl = expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;

//     try {
//         const team = await Team.findById(id);
//         res.json({ team });
//     } catch (error) {
//         res.json({ error });
//     }
// });

// //updates team

// const updateTeamctrl = expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;

//     const { name, description, email } = req.body;
//     const updateDocument = {
//         $push: { teamMembers: email },
//     };

//     try {
//         const team = await Team.findByIdAndUpdate(
//             id,
//             { name, description, updateDocument },
//             { new: true }
//         );

//         res.json({ team });
//     } catch (error) {
//         res.json(error);
//     }
// });

// //delete team

// const deleteTeamctrl = expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const team = await Team.findByIdAndDelete(id);

//         res.json({ team });
//     } catch (error) {
//         res.json(error);
//     }
// });

// module.exports = {
//     fetchUserTeams,
//     createTeamCtrl,
//     fetchOneTeamCtrl,
//     fetchAllTeams,
//     updateTeamctrl,
//     deleteTeamctrl,
// };
