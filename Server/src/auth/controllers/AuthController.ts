import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Endpoints } from "../../endpoints";
import { Request, Response } from "express";
import UserModel from "../../models/user.model";
import tokenMiddleware from "../middlewares/tokenMiddleware";

export class RegisterController {
  public static async createUser(req: Request, res: Response) {
    const emails = await Endpoints.email();
    const emailsList = emails.email;
    const nameList = emails.name;
    const password = "kuster@123";
    let number = 0;

    for (let i = 0; i < nameList.length; i++) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUserEmail = await UserModel.findOne({
        email: emailsList[i],
      });
      const existingUsername = await UserModel.findOne({
        username: nameList[i],
      });

      if (existingUserEmail) {
        continue;
      }
      if (existingUsername) {
        number++;
        const user = await UserModel.create({
          username: `${nameList[i]}_${number}`,
          email: emailsList[i],
          password: hashedPassword,
        });
        continue;
      } else {
        const user = await UserModel.create({
          username: nameList[i],
          email: emailsList[i],
          password: hashedPassword,
        });
      }
    }

    res.status(200).json({
      email: emailsList,
      username: nameList,
    });
  }

  public static async deleteAllUsers(req: Request, res: Response) {
    try {
      await UserModel.deleteMany();
      res.status(200).send("All users deleted successfully");
    } catch (error) {
      console.error("Error deleting users:", error);
      res.status(500).send("Error deleting users");
    }
  }
}

export class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).send("User not find.");
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (user.email !== email || !isPasswordCorrect) {
        res.status(403).send("Email or password is wrong");
      } else {
        try {
          const token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_TOKEN!,
            {
              expiresIn: "1h",
            }
          );

          res.json({
            user: user,
            token: token,
          });
        } catch (err) {
          res.status(500).send(err);
        }
      }
    }
  }
}

export class InfoController {
  /* Debug: 
  public static async infoData(req: Request, res: Response) {
    const id = req.params.id;

    const user = await UserModel.findOne({ _id: id });
    if (user) {
      res.send({
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404);
    }
  }
  */
  public static async listenEmail(req: Request, res: Response) {
    const emails = await Endpoints.email();
    const emailsList = emails.email;

    res.send(emailsList);
  }

  public static async listenName(req: Request, res: Response) {
    const emails = await Endpoints.email();
    const nameList = emails.name;
    res.send(nameList);
  }
}
