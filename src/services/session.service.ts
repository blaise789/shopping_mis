import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import config from "config"
import { findUser } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

export async function createSession(userId:string,userAgent:string){
    const session=await SessionModel.create({user:userId,userAgent})
    return session.toJSON();

}
// takes the schema doc and filter the mathcing result

export async function findSessions(query:FilterQuery<SessionDocument>){
    return SessionModel.find(query).lean()
}
export async function updateSession(query:FilterQuery<SessionDocument>,update:UpdateQuery<SessionDocument>){
    return SessionModel.updateOne(query,update)
       
}
