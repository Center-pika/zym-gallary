import os
import json

path = os.path.join('public', 'static', 'images')
# for img in os.listdir(path):
#     dst = img.split('_')[1]
#     os.rename(os.path.join(path, img), os.path.join(path, dst))

# for name in os.listdir(path):
#     img = os.path.join(path, name)
#     print(os.path.getctime(img))

images = sorted(os.listdir(path))
data = [{
    'src': os.path.join('static', 'images', name),
    'href': '#',
    'info': ''
} for name in images]
f = open(os.path.join('public', 'static', 'data.json'), 'w')
f.write(json.dumps(data))
f.close()