# enable-configurator
Web app and API to retrieve and modify STL files and designs on OnShape,.

Current version supports only e-Nable Italia BikeAdapter project (https://github.com/e-nableitalia/bikeadapter)

# Prerequisites 
## frontend
node.js / react / primefaces / primeflex => deployed as static content in apache http web server

## backend
Spring application, requires reverse proxy configuration and the following environment variables set:

ONSHAPE_API_ACCESSKEY => onshape account access key

ONSHAPE_API_SECRETKEY => onshape account sevret key

## backend.legacy
.NET 6.0

OnShape Base Document

OnShape Development Keys ( Set in the AuthDeclaration.cs)

Docker file with mcr.microsoft.com/dotnet/sdk:6.0 base image

## Preview Of STL file

The 3D preview model is generated using Three.JS

## Serialization Of Parameters

The parameter serialisation and parsing is created following the Onshape API Version 5 . 

## OnShape Document Customization

The current version allows partial dynamic configuration of OnShape document:
* the frontend application provides a static list of configurable devices (in current version only BikeAdapter and BikeAdapterV2 are supported, please, note, both point to the same onshapre document, the two devices are used to test device selection capability on the UI)
* frontend at present time has a collection of parameters associated to the device (this is derived by a static json structure and dynamically presented on the UI and then bound to onshape document for device parametrization in the "generate" phase).

The base document is used as a base to create new versions on which the parameters can be readjusted via parameters.

## TODO

Below are few new features we've in roadmap:
* extract the list of devices from onShape subscription
* extract the parameters definition fron the onShape document

## Compatibility

Currently tested and supported for Chrome

# Authors

Andrea Maddonni <andream2001@gmail.com>, e-Nable Italia

Kabir Lovero <kabirlovero@gmail.com>, e-Nable Italia

Alberto Navatta <alberto@e-nableitalia.it>, e-Nable Italia

# License

This software is released under *GNU General Public License v3.0*

# LIMITATION OF LIABILITY.
UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY, WHETHER TORT (INCLUDING NEGLIGENCE), CONTRACT, OR OTHERWISE, SHALL YOU, THE INITIAL DEVELOPER, ANY OTHER CONTRIBUTOR, OR ANY DISTRIBUTOR OF COVERED CODE, OR ANY SUPPLIER OF ANY OF SUCH PARTIES, BE LIABLE TO ANY PERSON FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF GOODWILL, WORK STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, OR ANY AND ALL OTHER COMMERCIAL DAMAGES OR LOSSES, EVEN IF SUCH PARTY SHALL HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES. THIS LIMITATION OF LIABILITY SHALL NOT APPLY TO LIABILITY FOR DEATH OR PERSONAL INJURY RESULTING FROM SUCH PARTY'S NEGLIGENCE TO THE EXTENT APPLICABLE LAW PROHIBITS SUCH LIMITATION. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS EXCLUSION AND LIMITATION MAY NOT APPLY TO YOU.
