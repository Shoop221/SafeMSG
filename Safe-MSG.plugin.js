/**
 * @name SafeMSG
 * @authorId 342035782204129285
 * @authorLink https://github.com/Shoop221
 * @source https://github.com/Shoop221/Safe-MSG/blob/main/Safe-MSG.plugin.js
 */
 module.exports = (() => {
    const version = "1.2";
    const config = {
        info: {
            name: "SafeMSG",
            authors: [{
                name: "Shoop221",
                discord_id: "6342035782204129285",
                github_username: "Shoop221",
            }],
            version: version,
            description: "Encrypts and Decrypts MSGS. commands: encry$, decry$, key$, genkey$, showkey$",
            github: "https://github.com/Shoop221/Safe-MSG/blob/main/Safe-MSG.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Shoop221/Safe-MSG/main/Safe-MSG.plugin.js"
        },
        changelog: [{
            title: `UI update`,
            type: "still in beta",
            items: [
                "Did some UI changes",
            ]
        }, ],
    }

        var password = "";

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
                                                                       

                            // Commands
                            switch (content.split("$")[0]) {
                                case "encry":    
                                //console.log(message.content.slice(7, message.content.length));
                                //console.log(message.content.slice(7, message.content.length).length);      
                                //console.log(message.content, caesarShift(message.content.slice(7, message.content.length).toLowerCase(), password));
                                
                                if(password.length == 0){
                                    BdApi.showToast('You must setup a key first!!', 
                                    {
                                        type: "error",
                                        Timeout: 3000
                                    }) 
                                    message.content = message.content.replace(message.content, "");

                                }else{
                                    console.log(password);
                                    message.content = message.content.replace(message.content, caesarShift(message.content.slice(7, message.content.length).toLowerCase(), password));
                                }
                                                                        
                                    break; 

                                case "key":
                                    var keytxt = message.content.slice(5, message.content.length);

                                if(isNaN(keytxt)){
                                    BdApi.showToast('This is not a number!', 
                                    {
                                        type: "error",
                                        Timeout: 3000
                                    })

                                    message.content = message.content.replace(message.content, "");


                                }else if(Math.sign(keytxt) == -1){;
                                    BdApi.showToast('Key cannot be negative!!', 
                                    {
                                        type: "error",
                                        Timeout: 3000
                                    })

                                    message.content = message.content.replace(message.content, "");

                                }else if(keytxt.length > 6){
                                    password = parseInt(keytxt.slice(0,6));
                                    BdApi.showToast('Key is set!! (this will reset when you restart discord!!)', 
                                    {
                                        type: "success",
                                        Timeout: 3000
                                    })
                                    message.content = message.content.replace(message.content, "");
                                    console.log(password);
                                    
                                }else{
                                    password = parseInt(keytxt);
                                    console.log(password);
                                    BdApi.showToast('Key is set!! (this will reset when you restart discord!!)', 
                                    {
                                        type: "success",
                                        Timeout: 3000
                                    })               
                                    message.content = message.content.replace(message.content, "");                    
                                }
                                break;

                            case "genkey":
                                password = "";
                                for(var i = 0; i < 6; i++){
                                    password = password + Math.floor(Math.random() * 10); 
                                }
                                password = parseInt(password);
                                console.log(password);
                                BdApi.showToast('The key has been generated', 
                                {
                                    type: "success",
                                    Timeout: 3000
                                })               
                                message.content = message.content.replace(message.content, "");                                  
                               

                                break;

                            case "showkey":
                                BdApi.showToast('The key is ' + password, 
                                {
                                    type: "success",
                                    Timeout: 3000
                                }) 
                                message.content = message.content.replace(message.content, "");
                                                                 

                                break;

                            case "decry":
                                var decrypass = "-" + password;                      
                                BdApi.showToast(caesarShift(message.content.slice(7, message.content.length).toLowerCase(), decrypass), 
                                    {
                                        type: "success"
                                    }
                                )
                                message.content = message.content.replace(message.content, "");


                                break;
                            }
                        });
                        
                        var caesarShift = function (str, amount) {
                            // Wrap the amount
                            if (amount < 0) {
                              return caesarShift(str, parseInt(amount) + 26);                            
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
                                  c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
                                }
                          
                                // Lowercase letters
                                else if (code >= 97 && code <= 122) {
                                  c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
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
