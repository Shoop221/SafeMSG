/**
 * @name SafeMSG
 * @authorId 342035782204129285
 * @authorLink https://github.com/Shoop221
 * @source https://github.com/Shoop221/SafeMSG/blob/main/SafeMSG.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Shoop221/SafeMSG/main/SafeMSG.plugin.js
 */
 var password;
 module.exports = (() => {
  const version = "1.8";
  const name = "SafeMSG";
  const config = {
    info: {
      name: "SafeMSG",
      authors: [
        {
          name: "Shoop221",
          discord_id: "6342035782204129285",
          github_username: "Shoop221",
        },
      ],
      version: version,
      description:
        "Encrypts and Decrypts MSGS. commands: encry$, decry$, showkey$",
      github:
        "https://github.com/Shoop221/SafeMSG/blob/main/SafeMSG.plugin.js",
      github_raw:
        "https://raw.githubusercontent.com/Shoop221/SafeMSG/main/SafeMSG.plugin.js",
    },
    changelog: [
      {
        title: `Added`,
        type: "beta",
        items: ["Added some settings stuff"],
      },
    ],
        defaultConfig: [{
          type: 'textbox',
          id: 'password',
          name: "key",
          note: 'If you want to make your own key put it here. (you can use numbers, letters, and symbols)',
      }, {
        type: "switch",
        id: "GenKey",
        name: "KeyGen",
        note: "Enable if you dont want to make your own key! (THE KEY WILL ONLY SHOW IM THE TEXTBOX AFTER YOU RELOAD THE PLUGIN!)",
        value: false
    }, ]
  };

  //function to generate the key
  function genkey() {
    var temp = Math.random() * (999999999 - 1000) + 1000;
    temp = parseInt(temp);
    return temp
  }

  //variables
  var settings = BdApi.loadData(config.info.name, `settings`);
  password = settings.password;
  var msg = "";
  var pwd;
  var letters;

  return (([Plugin, Api]) => {
    const plugin = (Plugin, Api) => {
      const { DiscordModules, Patcher } = Api;
      return class SafeMSG extends Plugin {
        constructor() {
          super();
        }


        onStart() {
          ZLibrary.PluginUpdater.checkForUpdate(name, version, "https://raw.githubusercontent.com/Shoop221/SafeMSG/main/SafeMSG.plugin.js");

        patcher();

          Patcher.after(
            DiscordModules.MessageActions,
            "sendMessage",
            (_, [, message]) => {
              const content = message.content.toLowerCase();

              // Commands
              switch (content.split("$")[0]) {

                //The Msg Encryption command
                case "encry":
                  msg = "";

                  //console.log(message.content.slice(7, message.content.length));
                  //console.log(message.content.slice(7, message.content.length).length);
                  //console.log(message.content, caesarShift(message.content.slice(7, message.content.length).toLowerCase(), password));

                  if (password.length == 0) {
                    BdApi.showToast("You must setup a key first!", {
                      type: "error",
                      Timeout: 3000,
                    });
                    message.content = message.content.replace(
                      message.content,
                      ""
                    );
                  } else {             
                    letters = message.content
                      .slice(7, message.content.length)
                      .toLowerCase()
                      .split("");
                    pwd = password.toString().split("");
                    var encrypwd = pwd;
                    //console.log(pwd);
                    for (var i = 0; i < letters.length; i++) {
                      caesarShift(letters[i], encrypwd[0]);
                      encrypwd.push(encrypwd.shift());
                    }
                    //console.log("------------------------------------");

                    message.content = msg.toString();
                  }

                  break;

                //The command to show the user their key
                case "showkey":
                  console.log(password);
                  BdApi.showToast("The key is " + password, {
                    type: "success",
                    Timeout: 3000,
                  });
                  message.content = message.content.replace(
                    message.content,
                    ""
                  );

                  break;

                //The command for message decryption
                case "decry":
                  msg = "";
                  letters = message.content
                    .slice(7, message.content.length)
                    .toLowerCase()
                    .split("");
                  pwd = password.toString().split("");
                  var decrypass = pwd;

                  for (var l = 0; l < decrypass.length; l++) {
                    if (decrypass[l] != 0) {
                      decrypass[l] = "-" + decrypass[l];
                    }
                  }

                  //console.log(decrypass);
                  for (var o = 0; o < letters.length; o++) {
                    caesarShift(letters[o], decrypass[0]);
                    decrypass.push(decrypass.shift());
                  }

                  BdApi.showToast(msg, {
                    type: "success",
                    Timeout: 3000,
                  });
                  message.content = message.content.replace(
                    message.content,
                    ""
                  );

                  break;
              }
            }
          );

          //The encryption/ decryption function
          var caesarShift = function (str, amount) {
            // Wrap the amount
            if (parseInt(amount) < 0) {
              return caesarShift(str, parseInt(amount) + 26);
            }

            //console.log(amount);
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
                  c = String.fromCharCode(
                    ((code - 65 + parseInt(amount)) % 26) + 65
                  );
                }

                // Lowercase letters
                else if (code >= 97 && code <= 122) {
                  c = String.fromCharCode(
                    ((code - 97 + parseInt(amount)) % 26) + 97
                  );
                }
              }

              // Append
              msg += c;
            }
          };
        }
       
        
        getSettingsPanel() {
          const panel = this.buildSettingsPanel();
          panel.addListener((id, checked) => {
            if (id == "GenKey") {
                if (checked) {
                    password = parseInt(genkey());
                    settings.password = password;
                    ZeresPluginLibrary.PluginUtilities.saveSettings(config.info.name, settings);
                    BdApi.showToast("The key is " + password + " (reload the plugin to see it in the textbox)", {
                      type: "success",
                      Timeout: 3000,
                    });
                    console.log(settings.password);                    
                }
            }else if(id == "password"){
              if(checked){
                settings.password = parseInt(checked);
                ZeresPluginLibrary.PluginUtilities.saveSettings(config.info.name, settings);
                password = settings.password;
                console.log(password);
              }
            }
        });
          return panel.getElement();
      }
        

        onStop() {
          Patcher.unpatchAll();
        }
      };
    };

    return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();
