import json
import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install("requests")


import requests
from requests.auth import HTTPBasicAuth


#
#print int(sys.argv[1]) + int(sys.argv[2])


## argv[1] file url, arg[2] newJSON
siteURL = sys.argv[1]
newConfigJSON = sys.argv[2]
#options  = "To edit the object depth press 2 ,\n to edit the fillet radius press 3\n"

#value = input(options)


#file = open("E:\\enableItalia\\OnDemandEditing\\baseConfig.json")
#data = json.load(newConfigJSON)

#choice = int(value)
#newval = ""
## Iterating through the json
## list
#for i in data['currentConfiguration'][choice]:
#    
#    if ( i == "value"):
#        value = input("Please insert value in mm \n")
#        data['currentConfiguration'][choice][i] = int(value)
#        data['currentConfiguration'][choice]["expression"] = str((int(value) )) + " m"
#        newval = str((int(value) )) + " m"
#
#print ("updated new value for "+ data['currentConfiguration'][choice]["parameterId"] +"  : " + newval )
#file.close()


#r = requests.post('https://username:Ly8ecTyHFSE8QS0TztFNCHrf:@cad.onshape.com/api/v5/elements/d/3e20a534d082b050adb3482b/w/8e785fa977cf4a1e1d95328b/e/fc7d76e65a96e0c5fe847de6/configuration', json=data, auth = HTTPBasicAuth('Ly8ecTyHFSE8QS0TztFNCHrf', 'oYpsCDcyH04ju8ZwHxUhrMNqanHAf3QGoWJzwD3etrFaSFQi'))
r = requests.post('https://username:Ly8ecTyHFSE8QS0TztFNCHrf:@cad.onshape.com/api/v5/elements/d/' + sys.argv[1], json=sys.argv[2], auth = HTTPBasicAuth('Ly8ecTyHFSE8QS0TztFNCHrf', 'oYpsCDcyH04ju8ZwHxUhrMNqanHAf3QGoWJzwD3etrFaSFQi'))

print("gambnaluuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")

    await client.SendAsync(request).ContinueWith(responseTask => {
                
                });
