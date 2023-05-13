"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.passwordRecovery = exports.userLogout = exports.userLogin = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({});
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, gender, userName, password, email, adminToken } = req.body;
        const takenEmail = yield userModel_1.default.findOne({ email });
        if (takenEmail) {
            res.status(500).json({ ok: false, errorMessage: `Email already exists in the system` });
        }
        else {
            const user = yield userModel_1.default.create({
                firstName: firstName.toLowerCase(),
                lastName: lastName.toLowerCase(),
                gender: gender.toLowerCase(),
                userName,
                password,
                email: email.toLowerCase(),
            });
            if (adminToken === "amit" && user.userRole === "simple") {
                user.userRole = "admin";
                user.save();
            }
            if (!secret)
                throw new Error("Missing jwt secret");
            const token = jwt_simple_1.default.encode({
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                userName: user.userName,
                email: user.email,
                userRole: user.userRole,
                role: "public"
            }, secret);
            res.cookie("user", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.redirect("/signIn");
        }
        const user = yield userModel_1.default.create({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            gender: gender.toLowerCase(),
            userName,
            password,
            email: email.toLowerCase(),
        });
        if (adminToken === "amit" && user.userRole === "simple") {
            user.userRole = "admin";
            user.save();
        }
        if (!secret)
            throw new Error("Missing jwt secret");
        const token = jwt_simple_1.default.encode({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            userName: user.userName,
            email: user.email,
            userRole: user.userRole,
            role: "public"
        }, secret);
        res.cookie("user", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.redirect("/signIn");
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.cookies;
        if (!secret)
            throw new Error("No secret");
        if (!user)
            throw new Error("No user found");
        const decoded = jwt_simple_1.default.decode(user, secret);
        const cookieUser = decoded;
        res.send({ ok: true, cookieUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "error.message" });
    }
});
exports.getUser = getUser;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        //User Authentication...
        const user = yield userModel_1.default.findOne({ userName, password });
        if (!user)
            throw new Error("User not found on get user function");
        if (!secret)
            throw new Error("Missing jwt secret");
        const token = jwt_simple_1.default.encode({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            userName: user.userName,
            email: user.email,
            userRole: user.userRole,
            role: "public"
        }, secret);
        res.cookie("user", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        });
        res.redirect("/profile");
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.userLogin = userLogin;
const userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.cookies;
        const user = yield userModel_1.default.findById(userId);
        if (!secret)
            throw new Error("Missing jwt secret");
        const token = jwt_simple_1.default.encode({
            userId: userId,
            role: "public"
        }, secret);
        res.cookie("user", token, {
            maxAge: -1,
            httpOnly: true,
        });
        res.send({ ok: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.userLogout = userLogout;
const passwordRecovery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userName, email } = req.body;
        const user = yield userModel_1.default.findOne({
            firstName,
            lastName,
            userName,
            email,
        });
        if (!user)
            throw new Error("User not found, check entered data");
        res.status(200).send({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.passwordRecovery = passwordRecovery;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const findUser = yield userModel_1.default.findByIdAndDelete(userId);
        if (!findUser)
            throw new Error("User not found in delete user route.");
        const users = yield userModel_1.default.find({});
        res.status(200).send({ findUser, users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, firstName, lastName, gender, userName, email } = req.body;
        const takenEmailUser = yield userModel_1.default.findOne({ email });
        if (takenEmailUser) {
            if (takenEmailUser.email !== email) {
                res.status(500).json({ ok: false, errorMessage: `Email already exists in the system` });
            }
            else if (takenEmailUser.email === email) {
                const updatedUser = yield userModel_1.default.findByIdAndUpdate({ _id: userId }, {
                    firstName,
                    lastName,
                    gender,
                    userName,
                    email,
                });
                const user = yield userModel_1.default.findById(userId);
                if (!secret)
                    throw new Error("Missing jwt secret");
                const token = jwt_simple_1.default.encode({
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    userName: userName,
                    email: email,
                    userRole: "simple",
                    role: "public"
                }, secret);
                res.cookie("user", token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.status(201).json({ ok: true, user });
            }
        }
        else {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate({ _id: userId }, {
                firstName,
                lastName,
                gender,
                userName,
                email,
            });
            const user = yield userModel_1.default.findById(userId);
            if (!secret)
                throw new Error("Missing jwt secret");
            const token = jwt_simple_1.default.encode({
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                userName: userName,
                email: email,
                userRole: "simple",
                role: "public"
            }, secret);
            res.cookie("user", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(201).json({ ok: true, user });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updateUser = updateUser;
