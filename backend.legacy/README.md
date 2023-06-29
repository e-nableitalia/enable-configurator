# Enable-Configurator
Backend Web app and API to retrieve and modify STL files and designs on OnShape

# Prerequisites 
.NET 6.0

OnShape Base Document
OnShape Development Keys ( Set in the AuthDeclaration.cs)


# Container deployment
Docker file with mcr.microsoft.com/dotnet/sdk:6.0 base image

# Standalone server deployment

// enable microsoft repos
rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
// install dotnet 6
yum install dotnet-sdk-7.0
// build project
dotnet build "Configurator.csproj" -c Development -o /home/centos/app/build
// publish project
dotnet publish "Configurator.csproj" -c Development -o /home/centos/app/publish /p:UseAppHost=false
// run application
dotnet Configurator.dll

# Preview Of STL file
The 3D preview model is generated using Three.JS

## Serialization Of Parameters

The parameter serialisation and parsing is created following the Onshape API Version 5 . 



# Base OnShape Document
This current version uses the version of a public  OnShape document, which is defined in the FileVersion class via the OriginalDId, OriginalWiD and OriginalEid .
The base document is used as a base to create new versions on which the parameters can be readjusted via parameters.

# Compatibility

Currently tested and supported for Chrome