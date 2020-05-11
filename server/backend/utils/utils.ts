import sqlite from "better-sqlite3";
import dotenv from "dotenv";
import { fail } from "assert";

dotenv.config();
export const db = sqlite(String(process.env.DB));

export async function toggleFeature(uid: string, features: string, value: any, res: any) {
    let failure = 0;
    const json = JSON.parse(features)
    for (const feature in json) {
        if (feature.length != 0) { // empty json parent when you dont fill out every input/slider.
            const value = JSON.stringify(json[feature]["value"]);

            const FeatureIsInDatabase = db.prepare("SELECT feature from enabled WHERE feature=? AND uid=?").all(feature, uid);

            if (FeatureIsInDatabase === undefined || FeatureIsInDatabase.length == 0) {
                failure++; // how many times it failed finding the feature
                continue;
            } else {
                const changeFeature = db.prepare("UPDATE enabled SET enabled=? WHERE feature=? and uid=?").run(value, feature, uid);
            }
        }
    }
    return res.status(200).json({
        success: true,
        message: "Features have been toggled.",
        failures: failure
    })
}

export async function getFeatures(uid: string, res) {
    const data = db.prepare("SELECT feature, enabled from enabled  WHERE uid=?").all(uid);
    return res.status(200).json({
        success: true,
        message: "data has been fetched.",
        data: data,
    })
}