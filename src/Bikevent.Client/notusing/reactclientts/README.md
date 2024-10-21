For https add launchSettings.json under properties 

{
  "profiles": {
    "profile1": {
      "commandName": "Project",
      "commandLineArgs": "--port 7091 --useHttps --cert \"certificate.pfx\" --password \"123\""
    }
  }
}