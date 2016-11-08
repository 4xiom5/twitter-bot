import * as fs from "fs";
import * as path from "path";

export class Configuration {
    private static configPath: string = path.join(__dirname, "../config.json");
    private static config: ConfigContent;

    private static defaultConfig: ConfigContent = {
        twitter_api: {
            consumer_key: "",
            consumer_secret: "",
            access_token_key: "",
            access_token_secret: ""
        },
        message: "",
        bot_account: "",
        retweet_keywords: [],
        response_keywords: []
    };

    private static configKeys: string[];

    public static get(key: string): any {
        if (!~Configuration.configKeys.indexOf(key)) {
            console.log(`Can"t find "${key}" in loaded config.`);
            return null;
        }
        return Configuration.config[key];
    }

    /**
     * Init functions
     */
    public static init() {
        if (fs.existsSync(Configuration.configPath)) {
            Configuration.config = Configuration.readConfig();
            Configuration.configKeys = Object.keys(Configuration.config);
            //Configuration.verifyConfig(Configuration.config);
        } else {
            Configuration.writeConfig();
        }
    }
    private static readConfig(): ConfigContent {
        return JSON.parse(fs.readFileSync(Configuration.configPath, "utf-8"));
    }
    private static writeConfig() {
        let configToWrite: string = JSON.stringify(Configuration.defaultConfig, null, 4);
        fs.writeFileSync(Configuration.configPath, configToWrite, {
            encoding: "utf-8"
        });
        console.log("Default config file wrote, please personalize !");
        process.exit(1);
    }

    /**
     * Compare objects keys content
     */
    private static verifyConfig(config: ConfigContent) {
        const defaultConfigKeys: string[]
            = Configuration.getKeysRecurse(Configuration.defaultConfig);
        if (Configuration.getKeysRecurse(config).toString() !== defaultConfigKeys.toString()) {
            console.log("Config doesn't respect the default config structure.");
            process.exit(1);
        }
    }

    private static getKeysRecurse(object: Object, parent?: string): string[] {
        const allKeys: string[] = [];
        const objectKeys: string[] = Object.keys(object);
        for (let objectKey of objectKeys) {
            const path: string = (parent ? `${parent}.` : "") + objectKey;
            allKeys.push(path);
            if (typeof object[objectKey] === "object") {
                allKeys.push(...Configuration.getKeysRecurse(object[objectKey], path));
            }
        }
        return allKeys;
    }
}

export interface ConfigContent {
    twitter_api: TwitterAPI;
    message: string;
    bot_account: string;
    retweet_keywords : string[],
    response_keywords : string[];
}

export interface TwitterAPI {
    consumer_key: "";
    consumer_secret: "";
    access_token_key: "";
    access_token_secret: "";
}
export interface WriteLogsOptions {
    file: boolean;
    console: boolean;
}