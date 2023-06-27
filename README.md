# enable-Configurator
Web app and API to retrieve and modify STL files and designs on OnShape

# Prerequisites 
## frontend
node.js / react / primefaces / primeflex

## backend.legacy
Spring application, requires three environment variables to run:

ONSHAPE_API_ACCESSKEY => onshape account access key

ONSHAPE_API_SECRETKEY => onshape account sevret key

ONSHAPE_DOCUMENT_URL => onshape url of the document to customize (e.g. "https://cad.onshape.com/documents/5b587ad656e9d002f8e6bad6/w/de2c6c2802ab923db649ef32/e/ab629266e0f6758e30a87845")

## backend.legacy
.NET 6.0

OnShape Base Document

OnShape Development Keys ( Set in the AuthDeclaration.cs)

# Container

Docker file with mcr.microsoft.com/dotnet/sdk:6.0 base image

# Preview Of STL file

The 3D preview model is generated using Three.JS

## Serialization Of Parameters

The parameter serialisation and parsing is created following the Onshape API Version 5 . 

# Base OnShape Document

This current version uses the version of a public  OnShape document, which is defined in the FileVersion class via the OriginalDId, OriginalWiD and OriginalEid .
The base document is used as a base to create new versions on which the parameters can be readjusted via parameters.

# Compatibility

Currently tested and supported for Chrome