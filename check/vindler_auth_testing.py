import requests
import os


# for single files 
'''
url = 'http://127.0.0.1:8000/facepredict/'
#directory = './test_male'
#directory = './test_female'
files = { "images":open('./test_male/sweetboy0.jpg', 'rb') }

print(files)
requests.post(url, files=files )                                               
'''                                                            
# ------------------------------------------------------------------------------------------------------------------

# for multile files




url = 'http://127.0.0.1:8000/faceauth/'
data = {}
data["targets"] = "m1a2l3e"
directory = './train_male'
#directory = './train_female'
#directory = './see'
#data["targets"] = "f1e2l3m4l5e"

files=[eval(f'("train_images", open("{directory + "/" + image}", "rb"))') for image in os.listdir(directory) if image != 'Thumbs.db']
print(files)
requests.post(url, files=files, data=data )



# https://stackoverflow.com/questions/18179345/uploading-multiple-files-in-a-single-request-using-python-requests-module
















































