import os
import json
from PIL import Image
import pandas as pd
from datetime import datetime

path = os.path.join('../', 'public', 'static', 'images')

def build_json():
    images = sorted(os.listdir(path), reverse=True)
    data = {}
    for name in images:
        if name.startswith('.') or not name.startswith('thumb'):
            continue
        month = name[10:12]
        d = {
            'name': name,
            'href': '#',
            'info': '{}/{}'.format(name[10:12], name[12:14]),
            'landscape': False
        }
        if month in data:
            data[month].append(d)
        else:
            data[month] = [d]
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

def build_csv():
    images = sorted(os.listdir(path))
    data = {
        'id': [],
        'datetime': [],
        'src': [],
        'thumb': [],
        'landscape': [],
        'info': [],
        'month': [],
        'year': [],
        'day': []
    }
    count = 1
    for name in images:
        if name.startswith('.') or name.startswith('thumb'):
            continue
        month = name[4:6]
        year = name[:4]
        day = name[6:8]
        hour = name[8:10]
        minute = name[10:12]
        dt = datetime(int(year), int(month), int(day), int(hour), int(minute))
        data['id'].append(count)
        data['datetime'].append(dt)
        data['src'].append(name)
        data['thumb'].append('thumb_'+name)
        data['landscape'].append(True)
        data['info'].append('{}/{}'.format(month, day))
        data['month'].append(month)
        data['year'].append(year)
        data['day'].append(day)
        count += 1
    for k in data:
        data[k] = data[k][::-1]
    df = pd.DataFrame.from_dict(data)
    df.to_csv('data.csv')

if __name__ == '__main__':
    # build_thumb()
    # build_json()
    build_csv()
