/**
 * @name Safe-MSG
 * @authorId 342035782204129285
 * @authorLink https://github.com/Shoop221
 * @source https://github.com/PrinceBunBun981/Textify/blob/main/Textify.plugin.js
 */
 module.exports = (() => {
    const version = "1.3.1";
    const config = {
        info: {
            name: "Textify",
            authors: [{
                name: "PrinceBunBun981",
                discord_id: "644298972420374528",
                github_username: "PrinceBunBun981",
                twitter_username: "PrinceBunBun981"
            }],
            version: version,
            description: "Use various commands to edit the text you send.",
            github: "https://github.com/PrinceBunBun981/Textify/blob/main/Textifyplugin.js",
            github_raw: "https://raw.githubusercontent.com/PrinceBunBun981/Textify/main/Textify.plugin.js"
        },
        changelog: [{
            title: `Bug Fixes`,
            type: "fixed",
            items: [
                "Fixed Experiments not showing up on restart even though it's enabled.",
            ]
        }, ],