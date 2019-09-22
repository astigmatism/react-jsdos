module.exports = {
    apps : [
        {
            name: "msdos.games",
            script: "/home/astigmatism/react-jsdos/node_modules/react-scripts/scripts/start.js",
            env: {
                "NODE_ENV": "production"
            },
            instances: -1,
            exec_mode: "cluster"
        }
    ]
}