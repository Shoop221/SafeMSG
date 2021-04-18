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

                            var password = 123456789;            
                            
                            // Commands
                            switch (content.split("$")[0]) {
                                case "encry":
                                const encry = (/^encry\! /g).exec(content);    
                                console.log(message.content.slice(7, message.content.length));
                                console.log(message.content.slice(7, message.content.length).length);      

                                message.content = message.content.replace("encry$", caesarShift(message.content.slice(7, message.content.length), password));
                                    break; 
                            }
                        });
                        
                        var caesarShift = function (str, password) {
                            // Wrap the Password
                            if (password < 0) {
                              return caesarShift(str, password + 26);
                            }
                          
                            // Make an output variable
                            var output = "";
                          
                            // Go through each character
                            for (var i = 0; i < str.length; i++) {
                              // Get the character we'll be appending
                              var c = str[i];
                          
                              // If it's a letter...
                              if (c.match(/[a-z]/i)) {
                                // Get its code
                                var code = str.charCodeAt(i);
                          
                                // Uppercase letters
                                if (code >= 65 && code <= 90) {
                                  c = String.fromCharCode(((code - 65 + password) % 26) + 65);
                                }
                          
                                // Lowercase letters
                                else if (code >= 97 && code <= 122) {
                                  c = String.fromCharCode(((code - 97 + password) % 26) + 97);
                                }
                              }
                          
                              // Append
                              output += c;
                            }
                          
                            // All done!
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
})();
