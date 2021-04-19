/**
 * @name SafeMSG
 * @authorId 342035782204129285
 * @authorLink https://github.com/Shoop221
 * @source https://github.com/Shoop221/Safe-MSG/blob/main/Safe-MSG.plugin.js
 */
 module.exports = (() => {
    const version = "2";
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
            title: `fixed some things and made it work`,
            type: "still in beta",
            items: [
                "fixed a lot of stuff and made it work... kinda",
            ]
        }, ],
    }

        var password = "";
//test
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
                                    message.content = message.content.replace(message.content, "[setup a key first!]")
                                }else{
                                    console.log(password);
                                    message.content = message.content.replace(message.content, caesarShift(message.content.slice(7, message.content.length).toLowerCase(), password));
                                }
                                                                        
                                    break; 

                                case "key":
                                    var keytxt = message.content.slice(5, message.content.length);

                                if(isNaN(keytxt)){
                                    message.content = message.content.replace(message.content, "[This key is not a number!!!]");

                                }else if(Math.sign(keytxt) == -1){;
                                    message.content = message.content.replace(message.content, "[No negative numbers]");

                                }else if(keytxt.length > 4){
                                    password = parseInt(keytxt.slice(0,4));
                                    message.content = message.content.replace(message.content, "[Key is set!! (note this will reset when you restart discord)]");
                                    console.log(password);
                                    
                                }else{
                                    password = parseInt(keytxt);
                                    console.log(password);
                                    message.content = message.content.replace(message.content, "[Key is set!! (note this will reset when you restart discord)]");                                    
                                }
                                break;

                            case "genkey":
                                password = "";
                                for(var i = 0; i < 4; i++){
                                    password = password + Math.floor(Math.random() * 10); 
                                }
                                password = parseInt(password);
                                console.log(password);
                                message.content = message.content.replace(message.content, "[Random key is set!! (show the key by using showkey$)]");                                    
                               

                                break;

                            case "showkey":
                                message.content = message.content.replace(message.content, "");
                                alert("The key is " + password);                                  

                                break;

                            case "decry":
                                var decrypass = "-" + password;                      
                                console.log(decrypass);
                                alert(caesarShift(message.content.slice(7, message.content.length).toLowerCase(), decrypass));
                                message.content = message.content.replace(message.content, "");


                                break;
                            }
                        });
                        
                        var caesarShift = function (str, amount) {
                            console.log(amount);
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
