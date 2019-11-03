'use strict';

var _globals = require('./globals');

var _utils = require('./utils');

/*
  Some parts of this file are based on UTIF.js,
  which was released under the MIT License.
  You can view that here:
  https://github.com/photopea/UTIF.js/blob/master/LICENSE
*/

var tagName2Code = (0, _utils.invert)(_globals.fieldTagNames);
var geoKeyName2Code = (0, _utils.invert)(_globals.geoKeyNames);

var name2code = {};
(0, _utils.assign)(name2code, tagName2Code);
(0, _utils.assign)(name2code, geoKeyName2Code);

var typeName2byte = (0, _utils.invert)(_globals.fieldTypeNames);

// config variables
var numBytesInIfd = 1000;

var _binBE = {
  nextZero: function nextZero(data, o) {
    var oincr = o;
    while (data[oincr] !== 0) {
      oincr++;
    }
    return oincr;
  },
  readUshort: function readUshort(buff, p) {
    return buff[p] << 8 | buff[p + 1];
  },
  readShort: function readShort(buff, p) {
    var a = _binBE.ui8;
    a[0] = buff[p + 1];
    a[1] = buff[p + 0];
    return _binBE.i16[0];
  },
  readInt: function readInt(buff, p) {
    var a = _binBE.ui8;
    a[0] = buff[p + 3];
    a[1] = buff[p + 2];
    a[2] = buff[p + 1];
    a[3] = buff[p + 0];
    return _binBE.i32[0];
  },
  readUint: function readUint(buff, p) {
    var a = _binBE.ui8;
    a[0] = buff[p + 3];
    a[1] = buff[p + 2];
    a[2] = buff[p + 1];
    a[3] = buff[p + 0];
    return _binBE.ui32[0];
  },
  readASCII: function readASCII(buff, p, l) {
    return l.map(function (i) {
      return String.fromCharCode(buff[p + i]);
    }).join('');
  },
  readFloat: function readFloat(buff, p) {
    var a = _binBE.ui8;
    (0, _utils.times)(4, function (i) {
      a[i] = buff[p + 3 - i];
    });
    return _binBE.fl32[0];
  },
  readDouble: function readDouble(buff, p) {
    var a = _binBE.ui8;
    (0, _utils.times)(8, function (i) {
      a[i] = buff[p + 7 - i];
    });
    return _binBE.fl64[0];
  },
  writeUshort: function writeUshort(buff, p, n) {
    buff[p] = n >> 8 & 255;
    buff[p + 1] = n & 255;
  },
  writeUint: function writeUint(buff, p, n) {
    buff[p] = n >> 24 & 255;
    buff[p + 1] = n >> 16 & 255;
    buff[p + 2] = n >> 8 & 255;
    buff[p + 3] = n >> 0 & 255;
  },
  writeASCII: function writeASCII(buff, p, s) {
    (0, _utils.times)(s.length, function (i) {
      buff[p + i] = s.charCodeAt(i);
    });
  },
  ui8: new Uint8Array(8)
};

_binBE.fl64 = new Float64Array(_binBE.ui8.buffer);

_binBE.writeDouble = function (buff, p, n) {
  _binBE.fl64[0] = n;
  (0, _utils.times)(8, function (i) {
    buff[p + i] = _binBE.ui8[7 - i];
  });
};

var _writeIFD = function _writeIFD(bin, data, _offset, ifd) {
  var offset = _offset;

  var keys = Object.keys(ifd).filter(function (key) {
    return key !== undefined && key !== null && key !== 'undefined';
  });

  bin.writeUshort(data, offset, keys.length);
  offset += 2;

  var eoff = offset + 12 * keys.length + 4;

  keys.forEach(function (key) {
    var tag = null;
    if (typeof key === 'number') {
      tag = key;
    } else if (typeof key === 'string') {
      tag = parseInt(key, 10);
    }

    var typeName = _globals.fieldTagTypes[tag];
    var typeNum = typeName2byte[typeName];

    if (typeName == null || typeName === undefined || typeof typeName === 'undefined') {
      throw new Error('unknown type of tag: ' + tag);
    }

    var val = ifd[key];

    if (typeof val === 'undefined') {
      throw new Error('failed to get value for key ' + key);
    }

    // ASCIIZ format with trailing 0 character
    // http://www.fileformat.info/format/tiff/corion.htm
    // https://stackoverflow.com/questions/7783044/whats-the-difference-between-asciiz-vs-ascii
    if (typeName === 'ASCII' && typeof val === 'string' && (0, _utils.endsWith)(val, '\0') === false) {
      val += '\0';
    }

    var num = val.length;

    bin.writeUshort(data, offset, tag);
    offset += 2;

    bin.writeUshort(data, offset, typeNum);
    offset += 2;

    bin.writeUint(data, offset, num);
    offset += 4;

    var dlen = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][typeNum] * num;
    var toff = offset;

    if (dlen > 4) {
      bin.writeUint(data, offset, eoff);
      toff = eoff;
    }

    if (typeName === 'ASCII') {
      bin.writeASCII(data, toff, val);
    } else if (typeName === 'SHORT') {
      (0, _utils.times)(num, function (i) {
        bin.writeUshort(data, toff + 2 * i, val[i]);
      });
    } else if (typeName === 'LONG') {
      (0, _utils.times)(num, function (i) {
        bin.writeUint(data, toff + 4 * i, val[i]);
      });
    } else if (typeName === 'RATIONAL') {
      (0, _utils.times)(num, function (i) {
        bin.writeUint(data, toff + 8 * i, Math.round(val[i] * 10000));
        bin.writeUint(data, toff + 8 * i + 4, 10000);
      });
    } else if (typeName === 'DOUBLE') {
      (0, _utils.times)(num, function (i) {
        bin.writeDouble(data, toff + 8 * i, val[i]);
      });
    }

    if (dlen > 4) {
      dlen += dlen & 1;
      eoff += dlen;
    }

    offset += 4;
  });

  return [offset, eoff];
};

var encodeIfds = function encodeIfds(ifds) {
  var data = new Uint8Array(numBytesInIfd);
  var offset = 4;
  var bin = _binBE;

  // set big-endian byte-order
  // https://en.wikipedia.org/wiki/TIFF#Byte_order
  data[0] = 77;
  data[1] = 77;

  // set format-version number
  // https://en.wikipedia.org/wiki/TIFF#Byte_order
  data[3] = 42;

  var ifdo = 8;

  bin.writeUint(data, offset, ifdo);

  offset += 4;

  ifds.forEach(function (ifd, i) {
    var noffs = _writeIFD(bin, data, ifdo, ifd);
    ifdo = noffs[1];
    if (i < ifds.length - 1) {
      bin.writeUint(data, noffs[0], ifdo);
    }
  });

  if (data.slice) {
    return data.slice(0, ifdo).buffer;
  }

  // node hasn't implemented slice on Uint8Array yet
  var result = new Uint8Array(ifdo);
  for (var i = 0; i < ifdo; i++) {
    result[i] = data[i];
  }
  return result.buffer;
};

var encodeImage = function encodeImage(values, width, height, metadata) {
  if (height === undefined || height === null) {
    throw new Error('you passed into encodeImage a width of type ' + height);
  }

  if (width === undefined || width === null) {
    throw new Error('you passed into encodeImage a width of type ' + width);
  }

  var ifd = {
    256: [width], // ImageWidth
    257: [height], // ImageLength
    273: [numBytesInIfd], // strips offset
    278: [height], // RowsPerStrip
    305: 'geotiff.js' // no array for ASCII(Z)
  };

  if (metadata) {
    for (var i in metadata) {
      if (metadata.hasOwnProperty(i)) {
        ifd[i] = metadata[i];
      }
    }
  }

  var prfx = new Uint8Array(encodeIfds([ifd]));

  var img = new Uint8Array(values);

  var samplesPerPixel = ifd[277];

  var data = new Uint8Array(numBytesInIfd + width * height * samplesPerPixel);
  (0, _utils.times)(prfx.length, function (i) {
    data[i] = prfx[i];
  });
  (0, _utils.forEach)(img, function (value, i) {
    data[numBytesInIfd + i] = value;
  });

  return data.buffer;
};

var convertToTids = function convertToTids(input) {
  var result = {};
  for (var key in input) {
    if (key !== 'StripOffsets') {
      if (!name2code[key]) {
        console.error(key, 'not in name2code:', Object.keys(name2code));
      }
      result[name2code[key]] = input[key];
    }
  }
  return result;
};

var toArray = function toArray(input) {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
};

var metadataDefaults = [['Compression', 1], // no compression
['PlanarConfiguration', 1], ['XPosition', 0], ['YPosition', 0], ['ResolutionUnit', 1], // Code 1 for actual pixel count or 2 for pixels per inch.
['ExtraSamples', 0], // should this be an array??
['GeoAsciiParams', 'WGS 84\0'], ['ModelTiepoint', [0, 0, 0, -180, 90, 0]], // raster fits whole globe
['GTModelTypeGeoKey', 2], ['GTRasterTypeGeoKey', 1], ['GeographicTypeGeoKey', 4326], ['GeogCitationGeoKey', 'WGS 84']];

var writeGeotiff = function writeGeotiff(data, metadata) {
  var isFlattened = typeof data[0] === 'number';

  var height = void 0;
  var numBands = void 0;
  var width = void 0;
  var flattenedValues = void 0;

  if (isFlattened) {
    height = metadata.height || metadata.ImageLength;
    width = metadata.width || metadata.ImageWidth;
    numBands = data.length / (height * width);
    flattenedValues = data;
  } else {
    numBands = data.length;
    height = data[0].length;
    width = data[0][0].length;
    flattenedValues = [];
    (0, _utils.times)(height, function (rowIndex) {
      (0, _utils.times)(width, function (columnIndex) {
        (0, _utils.times)(numBands, function (bandIndex) {
          flattenedValues.push(data[bandIndex][rowIndex][columnIndex]);
        });
      });
    });
  }

  metadata.ImageLength = height;
  delete metadata.height;
  metadata.ImageWidth = width;
  delete metadata.width;

  // consult https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml

  if (!metadata.BitsPerSample) {
    metadata.BitsPerSample = (0, _utils.times)(numBands, function () {
      return 8;
    });
  }

  metadataDefaults.forEach(function (tag) {
    var key = tag[0];
    if (!metadata[key]) {
      var value = tag[1];
      metadata[key] = value;
    }
  });

  // The color space of the image data.
  // 1=black is zero and 2=RGB.
  if (!metadata.PhotometricInterpretation) {
    metadata.PhotometricInterpretation = metadata.BitsPerSample.length === 3 ? 2 : 1;
  }

  // The number of components per pixel.
  if (!metadata.SamplesPerPixel) {
    metadata.SamplesPerPixel = [numBands];
  }

  if (!metadata.StripByteCounts) {
    // we are only writing one strip
    metadata.StripByteCounts = [numBands * height * width];
  }

  if (!metadata.ModelPixelScale) {
    // assumes raster takes up exactly the whole globe
    metadata.ModelPixelScale = [360 / width, 180 / height, 0];
  }

  if (!metadata.SampleFormat) {
    metadata.SampleFormat = (0, _utils.times)(numBands, function () {
      return 1;
    });
  }

  var geoKeys = Object.keys(metadata).filter(function (key) {
    return (0, _utils.endsWith)(key, 'GeoKey');
  }).sort(function (a, b) {
    return name2code[a] - name2code[b];
  });

  if (!metadata.GeoKeyDirectory) {
    var NumberOfKeys = geoKeys.length;

    var GeoKeyDirectory = [1, 1, 0, NumberOfKeys];
    geoKeys.forEach(function (geoKey) {
      var KeyID = Number(name2code[geoKey]);
      GeoKeyDirectory.push(KeyID);

      var Count = void 0;
      var TIFFTagLocation = void 0;
      var valueOffset = void 0;
      if (_globals.fieldTagTypes[KeyID] === 'SHORT') {
        Count = 1;
        TIFFTagLocation = 0;
        valueOffset = metadata[geoKey];
      } else if (geoKey === 'GeogCitationGeoKey') {
        Count = metadata.GeoAsciiParams.length;
        TIFFTagLocation = Number(name2code.GeoAsciiParams);
        valueOffset = 0;
      } else {
        console.log('[geotiff.js] couldn\'t get TIFFTagLocation for ' + geoKey);
      }
      GeoKeyDirectory.push(TIFFTagLocation);
      GeoKeyDirectory.push(Count);
      GeoKeyDirectory.push(valueOffset);
    });
    metadata.GeoKeyDirectory = GeoKeyDirectory;
  }

  // delete GeoKeys from metadata, because stored in GeoKeyDirectory tag
  for (var geoKey in geoKeys) {
    if (geoKeys.hasOwnProperty(geoKey)) {
      delete metadata[geoKey];
    }
  }

  ['Compression', 'ExtraSamples', 'GeographicTypeGeoKey', 'GTModelTypeGeoKey', 'GTRasterTypeGeoKey', 'ImageLength', // synonym of ImageHeight
  'ImageWidth', 'PhotometricInterpretation', 'PlanarConfiguration', 'ResolutionUnit', 'SamplesPerPixel', 'XPosition', 'YPosition'].forEach(function (name) {
    if (metadata[name]) {
      metadata[name] = toArray(metadata[name]);
    }
  });

  var encodedMetadata = convertToTids(metadata);

  var outputImage = encodeImage(flattenedValues, width, height, encodedMetadata);

  return outputImage;
};

module.exports = { writeGeotiff: writeGeotiff };