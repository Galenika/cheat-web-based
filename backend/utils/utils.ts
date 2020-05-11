import sqlite from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();
export const db = sqlite(String(process.env.DB));

export async function toggleFeature(uid: string, feature: string, value: any, res: any) {
    const FeatureIsInDatabase = db.prepare("SELECT feature from enabled WHERE feature=? AND uid=?").all(feature, uid);
    if(FeatureIsInDatabase === undefined || FeatureIsInDatabase.length == 0) {
        return res.status(200).json({
            success: false,
            message: "Feature has not been found in database."
        })
    } else {
        const changeFeature = db.prepare("UPDATE enabled SET enabled=? WHERE feature=? and uid=?").run(value, feature, uid);
        res.status(200).json({
            success: true,
            message: changeFeature
        })
    }
}