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
                            var place = 1
                            var encryText;
                            var signature = ['a','b','c','d','e','f','g','h','i','j',
                                            'k','l','m','n','o','p','q','r','s','t','u'
                                            ,'v','w','x','y','z','A','B','C','D','E','F',
                                            'G','H','I','J','K','L','M','N','O','P','Q',
                                            'R','S','T','U','V','W','X','Y','Z',0,1,2,3,
                                            4,5,6,7,8,9];
                                           
                            // Commands
                            switch (content.split("$")[0]) {
                                case "encry":
                                for(var i = 0; i > signature.length; i++){
                                   for(var o = 0; o > message.length; o++){
                                       if(message.content[i] == signature[i]){
                                        encryText = encryText + signature[i+password[place]];
                                        place++;
                                        if(place < password.length){
                                            place = 1;
                                        }
                                       }
                                   }
                                }
                                message.content = message.content.replace(message.content, encryText);
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
 



