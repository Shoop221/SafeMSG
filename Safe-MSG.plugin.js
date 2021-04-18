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

                        var shiftCharacters = function(str, password) {
                            if (password < 0) {
                                return shiftCharacters(str, password + 26);
                            }
                            var output = "";
                        
                            for (var i = 0; i < str.length; i++) {
                                var c = str[i];
                        
                                if (c.match(/[a-z]/i)) {
                                    var code = str.charCodeAt(i);
                        
                                    if (code >= 65 && code <= 90) {
                                        c = String.fromCharCode(((code - 65 + password) % 26) + 65);
                                    } else if (code >= 97 && code <= 122) {
                                        c = String.fromCharCode(((code - 97 + password) % 26) + 97);
                                    }
                                }
                        
                                output += c;
                            }
                            return output;
                        };


                        Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) => {
                            const content = message.content.toLowerCase();

                            var password = 1234;
                                           
                            // Commands
                            switch (content.split("$")[0]) {
                                case "encry":
                                    message.content = shiftCharacters(message.content.substr(encry[0].length, message.content.length), Number(shiftBy));
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
})




