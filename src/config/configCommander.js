import { Command } from "commander"
const command = new Command()
command.option("-p --port <port>", "port Server", 8080)
    .option("-m --mode <environment>", "environment")
    .option("-s --storage <persistence>", "persistence selected (MongoDB, FileSystem, etc")

command.parse()
export {command}