import os
import json
from PIL import Image

path = os.path.join('../', 'public', 'static', 'images')

def build_json():

    images = sorted(os.listdir(path), reverse=True)
    data = [{
        'name': name,
        'href': '#',
        'info': '{}/{}'.format(name[10:12], name[12:14])
    } for name in images if not name.startswith('.') and name.startswith('thumb')]
    f = open(os.path.join('..', 'public', 'static', 'data.json'), 'w')
    f.write(json.dumps(data))
    f.close()

def build_thumb(process_all=False):
    width = 640
    files = os.listdir(path)
    for name in files:
        if name.startswith('.') or name.startswith('thumb'):
            continue
        if not process_all and 'thumb_'+name in files:
            continue
        img = Image.open(os.path.join(path, name))
        height = int(img.height*(width/img.width))
        img.resize((width, height)).save(os.path.join(path, 'thumb_'+name))

if __name__ == '__main__':
    build_thumb()
    build_json()