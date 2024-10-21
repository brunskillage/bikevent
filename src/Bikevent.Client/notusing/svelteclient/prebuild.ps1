#Requires -Version 5.1

<############## Description / Goal of Script ###############

Convert pdfs to jpgs
Requires image majick and the convert util

############################################################>

############## Powershell Settings ###############
Set-StrictMode -Version 5.1
$PSDefaultParameterValues['*:Encoding'] = 'utf8'
$scriptPath = $PSScriptRoot

Clear-Host
Write-Host "Starting Script"
$infoLines = @()
$StartTime = (Get-Date)

############## Refs ###############


############## Variables ###############

# user
$srcDir = "C:\Users\abrun\CloudStation\AllanB\_Ulysess\Events"


############## Classes ###############

<#

class SomeClass {
    [string] $Prop1

    SomeClass(
        [string]$p1
    ){
        $this.Prop1 = $p1
    }
}
$test = [SomeClass]::new("someval")

#>

############## Data Objects ###############

############## Functions ###############

# function <name> {
#     param ([type]$parameter1 [,[type]$parameter2])
#     <statement list>
# }

function Cmd($cmd) {
    Write-Host "Running Command: $($cmd)"
    cmd.exe /C "$($cmd.Trim())"
}

function Info([string] $msg) {
    $line = "$((Get-Date).ToString("HH:mm:ss.fff")) [INFO] : $msg"
    if ($msg -like "*error*") {
        Write-Host $line -ForegroundColor Red
    }
    elseif ($msg -like "*success*") {
        Write-Host $line -ForegroundColor Green
    }
    else {
        Write-Host $line -ForegroundColor Blue
    }
    
    $infoLines += $line
}

function Start-Program {
    Info "Beginning Program"

    # check paths etc
}

function Stop-Program {
    Info "Ending Program"
}

##########################################
#              PROGRAM                   #
##########################################

Start-Program

# copy package.json file to .\build
# copy package-lock.json
# copy handler.js to build
# copy bikevent.js to build
# copy .env to build

# copy build files to folder

Stop-Program

##########################################
#            END PROGRAM                 #
##########################################

############## End Program ###############
$EndTime = (Get-Date)
$TotalTime = $EndTime - $StartTime
$TotalTime