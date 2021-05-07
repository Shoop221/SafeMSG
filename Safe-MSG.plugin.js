/**
 * @name SafeMSG
 * @authorId 342035782204129285
 * @authorLink https://github.com/Shoop221
 * @source https://github.com/Shoop221/Safe-MSG/blob/main/Safe-MSG.plugin.js
 */
 module.exports = (() => {
    const version = "1.4";
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
            title: `Updating the encryption/ decryption`,
            type: "beta",
            items: [
                "Fixed issues with decryption not working.",
            ]
        }, ],
    }

        var password = "";
        var msg = "";
        var pwd;
        var letters;

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
                                    msg = "";    
                                //console.log(message.content.slice(7, message.content.length));
                                //console.log(message.content.slice(7, message.content.length).length);      
                                //console.log(message.content, caesarShift(message.content.slice(7, message.content.length).toLowerCase(), password));
                                
                                if(password.length == 0){
                                    BdApi.showToast('You must setup a key first!', 
                                    {
                                        type: "error",
                                        Timeout: 3000
                                    }) 
                                    message.content = message.content.replace(message.content, "");

                                }else{
                                    //console.log(password);
                                     letters = message.content.slice(7, message.content.length).toLowerCase().split("");
                                     pwd = password.toString().split("");
                                    var encrypwd = pwd
                                    console.log(pwd);
                                  for(var i = 0; i < letters.length; i++){
                                    caesarShift(letters[i], encrypwd[0]);
                                    encrypwd.push(encrypwd.shift());
                                  }
                                  console.log("------------------------------------");                 
                                  
                                 message.content = msg.toString();
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
                                    BdApi.showToast('Key cannot be negative!', 
                                    {
                                        type: "error",
                                        Timeout: 3000
                                    })

                                    message.content = message.content.replace(message.content, "");

                                }else if(keytxt.length > 6){
                                    password = parseInt(keytxt.slice(0,6));
                                    BdApi.showToast('Key is set!! (this will reset when you restart discord!)', 
                                    {
                                        type: "success",
                                        Timeout: 3000
                                    })
                                    message.content = message.content.replace(message.content, "");
                                    //console.log(password);
                                    
                                }else{
                                    password = parseInt(keytxt);
                                    //console.log(password);
                                    BdApi.showToast('Key is set!! (this will reset when you restart discord!)', 
                                    {
                                        type: "success",
                                        Timeout: 3000
                                    })               
                                    message.content = message.content.replace(message.content, "");                    
                                }
                                break;

                            case "genkey":
                                password = Math.floor((Math.random() * 999999)+ 1);                              
                                password = parseInt(password);
                                
                                //console.log(password);
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
                                msg = "";
                                 letters = message.content.slice(7, message.content.length).toLowerCase().split("");
                                 pwd = password.toString().split("");    
                                 var decrypass = pwd;                            
                                                                
                                for(var l = 0; l < decrypass.length; l++){     
                                    if(decrypass[l] != 0){
                                        decrypass[l]="-"+decrypass[l];
                                    }
                                } 

                                console.log(decrypass);
                                for(var o = 0; o < letters.length; o++){
                                    caesarShift(letters[o], decrypass[0]);
                                    decrypass.push(decrypass.shift());
                                  }  
                                  
                                  BdApi.showToast(msg, 
                                  {
                                      type: "success",
                                      Timeout: 3000
                                  })         
                                  message.content = message.content.replace(message.content, "");                                  



                                break;
                            }
                        });
                        
                        var caesarShift = function (str, amount) {
                            // Wrap the amount
                            if (parseInt(amount) < 0) {
                              return caesarShift(str, parseInt(amount) + 26);
                            }
                          
                            console.log(amount);
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
                                  c = String.fromCharCode(((code - 65 + parseInt(amount)) % 26) + 65);
                                }
                          
                                // Lowercase letters
                                else if (code >= 97 && code <= 122) {
                                  c = String.fromCharCode(((code - 97 + parseInt(amount)) % 26) + 97);
                                }
                              }
                          
                              // Append
                              msg += c;
                            }
                          
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
