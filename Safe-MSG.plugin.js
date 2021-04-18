/**
 * @name SafeMSG
 * @authorId 342035782204129285
 * @authorLink https://github.com/Shoop221
 * @source https://github.com/Shoop221/Safe-MSG/blob/main/Safe-MSG.plugin.js
 */
 module.exports = (() => {
    const version = "1";
    const config = {
        info: {
            name: "SafeMSG",
            authors: [{
                name: "Shoop221",
                discord_id: "6342035782204129285",
                github_username: "Shoop221",
            }],
            version: version,
            description: "Encrypts and Decrypts MSGS.",
            github: "https://github.com/Shoop221/Safe-MSG/blob/main/Safe-MSG.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Shoop221/Safe-MSG/main/Safe-MSG.plugin.js"
        },
        changelog: [{
            title: `Testing`,
            type: "Beta",
            items: [
                "Fixed / added some stuff",
            ]
        }, ],
    }
        return (([Plugin, Api]) => {

            const plugin = (Plugin, Api) => {
                const {
                    DiscordModules,
                    Patcher
                } = Api;
                return class SafeMSG extends Plugin {
                    constructor() {
                        super();
                    }
    
                    onStart() {
                        var CryptoJS = require("crypto-js");
                        Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) => {
                            const content = message.content.toLowerCase();
    
    
                            // Commands
                            switch (content.split("$")[0]) {
                                case "encry":
                                    const encry = (/^encry\$ /g).exec(content);

                                    const encrypt = message.content.substr(encry[0].length, message.content.length)
                                    .split(" ")
                                    .join("\t");

                                    message.content = CryptoJS.AES.encrypt(encrypt, 'secret key 123').toString();
                                    break; 
                            }
                        });
                    }
    
                    getSettingsPanel() {
                        
                    }
    
                    onStop() {
                        Patcher.unpatchAll();
                    }
                }
            };
    
            return plugin(Plugin, Api);
        })(global.ZeresPluginLibrary.buildPlugin(config));
    })();
 



