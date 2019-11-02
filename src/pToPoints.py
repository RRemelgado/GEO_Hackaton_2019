# -*- coding: utf-8 -*-
"""
Created on Sat Nov  2 10:12:54 2019

@author: rr70wedu
"""

#-----------------------------------------------------------------------------#
# 0. load required modules and arguments
#-----------------------------------------------------------------------------#

from argparse import ArgumentParser
from collections import OrderedDict
import rasterio as rt
import numpy as np
import fiona as fn
import fiona.crs

parser = ArgumentParser(
    description = 'Derives a geoJSON object from selected \
    points in a raster image, given a user defined threshold')

parser.add_argument("threshold", help = "minimum value")
parser.add_argument("input", help = "input GeoTiff file")
parser.add_argument("output", help = "output, geojson file")

options = parser.parse_args()
threshold = options.threshold
ifile = options.input
ofile = options.output

#-----------------------------------------------------------------------------#
# 1. read spatial information
#-----------------------------------------------------------------------------#

ids = rt.open(ifile)
a = ids.read(1)

#-----------------------------------------------------------------------------#
# 2. find data points above the given threshold
#-----------------------------------------------------------------------------#

px = np.where(a >= threshold) # find target pixels
xy = ids.xy(px[0], px[1]) # derive pixel coordinates

#-----------------------------------------------------------------------------#
# 3. build geoJSON with selected points
#-----------------------------------------------------------------------------#

odict = OrderedDict([('x','float'), ('y','float'), ('score','float')])
schema = {'geometry': 'Point','properties': odict}
ods = fn.open(ofile, 'w',  driver ="GeoJSON", schema=schema, 
              encoding='utf-8', crs=fn.crs.from_epsg(4326))

for i in range(0, len(xy[0])):
    
    geom = {'type': 'Point', 'coordinates': (xy[0][i], xy[1][i])}
    prop = {'x':float(xy[0][i]), 'y':float(xy[1][i]), 
            'score':float(a[px[0][i], px[1][i]])}
    ods.write({'geometry':geom, 'properties':prop})

ods.close()
