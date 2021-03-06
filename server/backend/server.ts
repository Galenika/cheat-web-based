import express from "express";
import next from "next";
import bodyParser from "body-parser";
import {AddressInfo} from "net";
import { toggleFeature, getFeatures } from "./utils/utils";
import cors from "cors";

const dev = process.env.NODE_ENV === "development";
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
const app = express();


app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });

app.post("/toggleFeature", async (req, res, next) => {
    const features = req.body.features;
    const uid = req.body.uid;
    const value = req.body.value;

    if(uid && features && value) {
        await toggleFeature(String(uid), features, value, res);
    } else {
        console.log("sending request..");
        return res.status(403).json({
            success: false,
            message: "Wrong arguements."
        })
    }
})

app.get("/getFeatures", async(req, res, next) => {
    const uid = req.body.uid;  // you could "secure" the settings by asking for a password or username but whatever this is a example.
    if(uid) {
        await getFeatures(uid, res);
    } else {
        return res.status(403).json({
            success: false,
            message: "Wrong arguements."
        })
    }
})

nextApp.prepare().then(async () => {
    app.get('*', (req, res) => {
        return handle(req, res);
    });

    const s = app.listen(3002, () => {
        console.log(`Listening on port ${(s.address() as AddressInfo).port}`);
    });
});
