import json
import requests
from requests.auth import HTTPBasicAuth

options  = "To edit the object depth press 2 ,\n to edit the fillet radius press 3\n"

value = input(options)


file = open(".\baseConfig.json")
data = json.load(file)

choice = int(value)
newval = ""
# Iterating through the json
# list
for i in data['currentConfiguration'][choice]:
    
    if ( i == "value"):
        value = input("Please insert value in mm \n")
        data['currentConfiguration'][choice][i] = (int(value) / 1000 ) 
        data['currentConfiguration'][choice]["expression"] = str((int(value) / 1000 )) + " m"
        newval = str((int(value) / 1000 )) + " m"

print ("updated new value for "+ data['currentConfiguration'][choice]["parameterId"] +"  : " + newval )
file.close()


r = requests.post('https://username:Ly8ecTyHFSE8QS0TztFNCHrf:@cad.onshape.com/api/v5/elements/d/31a8edb37f226775541285fb/w/790b1d33a7e696cf6f0574e3/e/e75696da2ead41a010d58d06/configuration', json=data, auth = HTTPBasicAuth('Ly8ecTyHFSE8QS0TztFNCHrf', 'oYpsCDcyH04ju8ZwHxUhrMNqanHAf3QGoWJzwD3etrFaSFQi'))

print(r)

