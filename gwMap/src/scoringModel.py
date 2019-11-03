# -*- coding: utf-8 -*-
"""
Created on Sat Nov  2 18:34:59 2019

@author: rr70wedu
"""

#-----------------------------------------------------------------------------#
# 0. load required packages
#-----------------------------------------------------------------------------#

from argparse import ArgumentParser
import rasterio as rt
import numpy as np
import glob2 as g

parser = ArgumentParser(description="Scoring model to identify \
                        potential groundwater bores")

parser.add_argument("directory", help = "input directory")
parser.add_argument("output", help = "output csv file")

options = parser.parse_args()
idir = options.directory
ofile = options.output

#-----------------------------------------------------------------------------#
# 1. initiate output geotiff
#-----------------------------------------------------------------------------#

files = g.glob(idir + '*scaled.tif')
ids = rt.open(files[0])

nr = ids.height
nc = ids.width

p = ids.meta.copy()
p.update(compress='deflate', predict=2, zlevel=9, dtype='float32', nodata=0)
ods = rt.open(ofile, 'w', **p)

#-----------------------------------------------------------------------------#
# 2. apply scoring model (i.e. sum all layers)
#-----------------------------------------------------------------------------#

oa = np.zeros((nr, nc), dtype='float32')
for i in range(0, len(files)):
    ids = rt.open(files[i])
    a = ids.read(1)
    a[a == ids.nodata] = np.nan
    a[np.isfinite(a) == False] = np.nan
    oa[:,:] = oa[:,:] + a
    a = None
    ids.close()

oa[np.isfinite(oa) == False] = 0
ods.write(oa, indexes=1)
ods.close()

