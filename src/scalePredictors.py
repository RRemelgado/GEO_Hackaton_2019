# -*- coding: utf-8 -*-
"""
Created on Sat Nov  2 19:34:24 2019

@author: rr70wedu
"""

#-----------------------------------------------------------------------------#
# 0. load required modules
#-----------------------------------------------------------------------------#

from argparse import ArgumentParser
import rasterio as rt
import numpy as np
 
parser = ArgumentParser(description="Scales predictors used in scoring model")

parser.add_argument("variables", help = "csv file with path to variables")

# translate command line arguments into usable varibales
options = parser.parse_args()
variables = options.variables
vpath = list(variables.iloc[:,0].values) # variable path
vimp = list(variables.iloc[:,2].values) # variable importance
vwei = list(variables.iloc[:,3].values) # variable weight
variables = None

#-----------------------------------------------------------------------------#
# 1. load variables and rescale
#-----------------------------------------------------------------------------#

for i in range(9, len(vpath)):
    
    ids = rt.open(vpath[i])
    a = ids.read(1).astype('float32')
    
    px = np.where(np.isfinite(a) & (a != ids.nodata))
    if vimp[i] == 'min':
        a[px] = (1 - (a[px] / np.max(a))) * vwei[i]
    
    if vimp[i] == 'max':
        a[px] = a[px] / np.max(a)
    
    a[a == ids.nodata] = 0
    
    p = ids.meta.copy()
    p.update(compress='deflate', predict=2, zlevel=9, dtype='float32', nodata=0)
    ofile = vpath[i].split('.')[0] + '_scaled.tif'
    ods = rt.open(ofile, 'w', **p)
    ods.write(a, indexes=1)
    ods.close()
