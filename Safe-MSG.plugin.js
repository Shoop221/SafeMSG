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
                        Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) => {
                            const content = message.content.toLowerCase();

                            var password = 1234;
                            var place = 0;
                            var encryNum = "";
                            var encryText = "";
                                           
                            // Commands
                            switch (content.split("$")[0]) {
                                case "encry":
                                for(var i = 0; i > message.content.slice(7, message.content.length).length; i++){
                                    encryNum = message.content.charCodeAt(i);
                                   if(encryNum >= 65 && encryNum <= 90){
                                       encryText = string.fromCharCode(((encryNum - 65 + password.charAt(place)) % 26) +65);
                                   }else if(encryNum >= 97 && encryNum <= 122){
                                    encryText = string.fromCharCode(((encryNum - 97 + password.charAt(place)) % 26 ) + 97);
                                   }
                                   place++;
                                   if(place > password.length){
                                       place = 0;
                                   }
                                   encryNum = "";
                                }
                                console.log(encryText);
                                message.content = message.content.replace("encry$", encryText);
                                    break; 
                            }
                        });


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
 



