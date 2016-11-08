import { Configuration } from "./Configuration";
const Twitter = require("twitter");

Configuration.init();

const client = new Twitter(Configuration.get("twitter_api"));
const message = Configuration.get("message");
const botAccount = Configuration.get("bot_account");

let responseTrack = "";
Configuration.get("response_keywords").forEach((value, index) => {
    if (index != 0) {
        responseTrack += ",";
    }
    responseTrack += value;
});

let apiError = false;

if (responseTrack !== "") {
    const responseStream = client.stream("statuses/filter", { track: responseTrack });
    responseStream.on("data", function (data) {
        if (!apiError) {
            client.post("statuses/update", { status: `@${data.user.screen_name} ${message}`, in_reply_to_status_id: data.id }, function (error, tweet, response) {
                if (!error) {
                    console.error(error);
                    console.log("Waiting 10min before responding...");
                    apiError = true;
                    setTimeout(() => {
                        apiError = false;
                        console.log("Start responding again...");
                    }, 1000 * 60 * 10);
                }
            });
        }
    });
    responseStream.on("error", console.error);
}


let retweetTrack = "";
Configuration.get("retweet_keywords").forEach((value, index) => {
    if (index != 0) {
        retweetTrack += ",";
    }
    retweetTrack += value;
});

if (retweetTrack !== "") {
    const retweetStream = client.stream("statuses/filter", { track: retweetTrack });
    retweetStream.on("data", function (data) {
        if (data.user.screen_name !== botAccount && !apiError) {
            client.post("statuses/retweet", { id: data.id_str }, function (error, tweet, response) {
                if (error) {
                    console.error(error);
                    console.log("Waiting 10min before retweeting...");
                    apiError = true;
                    setTimeout(() => {
                        apiError = false;
                        console.log("Start retweeting again...");
                    }, 1000 * 60 * 10);
                }
            });
        }
    });
    retweetStream.on("error", console.error);
}