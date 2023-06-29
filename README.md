# enable-configurator
Web app and API to retrieve and modify STL files and designs on OnShape,.

Current version supports only e-Nable Italia BikeAdapter project (https://github.com/e-nableitalia/bikeadapter)

# Prerequisites 
## frontend
node.js / react / primefaces / primeflex => deployed as static content in apache http web server

## backend.legacy
Spring application, requires reverse proxy configuration and the following  environment variables set:

ONSHAPE_API_ACCESSKEY => onshape account access key

ONSHAPE_API_SECRETKEY => onshape account sevret key

ONSHAPE_DOCUMENT_URL => onshape url of the document to customize (e.g. "https://cad.onshape.com/documents/5b587ad656e9d002f8e6bad6/w/de2c6c2802ab923db649ef32/e/ab629266e0f6758e30a87845")

## backend.legacy
.NET 6.0

OnShape Base Document

OnShape Development Keys ( Set in the AuthDeclaration.cs)

Docker file with mcr.microsoft.com/dotnet/sdk:6.0 base image

## Preview Of STL file

The 3D preview model is generated using Three.JS

## Serialization Of Parameters

The parameter serialisation and parsing is created following the Onshape API Version 5 . 

## Base OnShape Document

This current version uses the version of a public OnShape document whose url is specified with the ENV parameter: ONSHAPE_DOCUMENT_URL.
The base document is used as a base to create new versions on which the parameters can be readjusted via parameters.

## Compatibility

Currently tested and supported for Chrome

# Authors
Kabir Lovero <kabirlovero@gmail.com>, e-Nable Italia

Alberto Navatta <alberto@e-nableitalia.it>, e-Nable Italia

# License

This software is released under *GNU General Public License v3.0*

# LIMITATION OF LIABILITY.
UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY, WHETHER TORT (INCLUDING NEGLIGENCE), CONTRACT, OR OTHERWISE, SHALL YOU, THE INITIAL DEVELOPER, ANY OTHER CONTRIBUTOR, OR ANY DISTRIBUTOR OF COVERED CODE, OR ANY SUPPLIER OF ANY OF SUCH PARTIES, BE LIABLE TO ANY PERSON FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF GOODWILL, WORK STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, OR ANY AND ALL OTHER COMMERCIAL DAMAGES OR LOSSES, EVEN IF SUCH PARTY SHALL HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES. THIS LIMITATION OF LIABILITY SHALL NOT APPLY TO LIABILITY FOR DEATH OR PERSONAL INJURY RESULTING FROM SUCH PARTY'S NEGLIGENCE TO THE EXTENT APPLICABLE LAW PROHIBITS SUCH LIMITATION. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS EXCLUSION AND LIMITATION MAY NOT APPLY TO YOU.
