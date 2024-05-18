module.exports = {
    launch: {
        headless: true,
        slowMo: 20
    },
    server: {
        command: "node test.cjs",
        port: 3000,
        launchTimeout: 100000,
        debug: true,
      },
}