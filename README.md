## GEO Hackaton 2019 Challenge 6: Detecting Ground Water Point Bore Wells

<img src="https://www.earthobservations.org/documents/geo16/hackathon_banner_m.jpg">

### Description
Welcome to our gitLab project! It compiles the contribution of the <a href="https://www.idiv.de/en">German Centre for Integrative Biodiversity Research (iDiv)</a> to <a href="https://www.earthobservations.org/geoweek19.php?t=hackathon_about">the GEO Week 2019 Hackaton</a> where we spent two (very intensive) days developing a web application to inform on potentiatly suitable locations to install bores in Thailand. Given the spatial extent of our study region, we did not upload the remote sensing variables used in this exercise. However, we uploaded our folder structure along with some of it's data, which offers a baseline to reproduce our work.

</br>

### Background
<p align="justify">
In regions such as Thailand and its neighboring countries, where food production is contingent on intensive, water dependent agriculture, the drainage of groundwater for irrigation contributes to the lowering of water tables, compromising its long-term use. This contributes to negative side-effects, such as salinity, stream depletion and land subsidence, that hinder agricultural productivity putting food security - and environmental sustanability - at grave risk. In tis context, the detection of groundwater storage - which can be explored though bore holes - is an essential step to optimize water utilization. This knowledge can lead farmers towards precision agriculture and avoid a waste of resources, as well as it's depletion within threaten aquifers. Such information can be further supported by the use of field-level weather stations. Such stations offer information on biophysical parametes such as temperature, humidity, soil moisture and particular matter, and can be used to refine the mapping and monitoring of groundwater. This effectively empowers the farmers, turning them into active contributers of environmental monitoring.
</p>

</br>

<p align="center">
<img width=600 height=300 src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/studySite.png"><caption>Study site location</caption>
</p>

</br>

### Process
<p align="justify">
Nowadays, open-access satellite sensors are abundant and the development of high-performance computing platforms has lead to an era of intensive data production. In this context, the challenge of the remote sensing community is shiftting from the development of new metrics to the ability to integrate an insane multitude of data products into a meaningful - and useful - representation of the world that can serve practical applications such as the challenge at hand.
</p>
<p align="justify">
In this exercie, we integrated different products on biophysical conditons (i.e. climate, soil, water balance, surface water) to detect locations with potential groundwater deposits that are suitable for the installation of bores, an essential practice in rural development. Moreover, our work dependended on state-of-the-art socio-economic variables, such as population density and distance to the nearest city, variables that are deeply dependent on a variety of complex remote sensing products (e.g. urban areas, building height). When accessing underground aquifers, elements such as polution originating from densely populated areas can contribute for the contamination of water deposits, making such layers highly relevant.
</p>

</br>

<p align="justify">
We collected all of these variables using a series of open-access data portals (e.g. Google Earth Engile, Copernicus, CCI) over Thailand and its neighboring coutries at a resolution of 300 m. Then, we combined them in a multi-variate scoring model where each variable receives a weight after scaling representing its importance in the model, seen in the table below. The importance field represents which values are highlighted. When "max", the highest values in the variable are most important. The presence example Seasonal water (set to "max") can help us detect pixels where water can have infitrated into the underground and where the instalation of bores is possible. However, pixels with permanent water (set to "min") are likely covered by e.g. rivers where the instalation of bores is not feasible. 
</p>
<p align="justify">
The final layer was then queried with Open Street Map (OSM) data on wells to determine an optimal threshold for selecting groundwater deposits and then converted the selected pixels to a vector that was fed to our webapp, together with information on e.g. land cover, precipitation and temperature for the selected sites. The algorithms were developed in python and depend on purely open-source modules. The resulting functions were written as scalable command line application and can be used sequentially to automatically generate an updated version of our product.
</p>

</br>

<table style="margin:0px auto; width:500px">
  <tr>
    <th>Variable</th>
    <th>Weight</th>
    <th>Importance</th>
  </tr>
  <tr>
    <td>Soil Depth</td>
    <td>1</td>
    <td>max</td>
  </tr>
  <tr>
    <td>Slope</td>
    <td>1</td>
    <td>min</td>
  </tr>
  <tr>
    <td>Soil Porosity</td>
    <td>1</td>
    <td>min</td>
  </tr>
  <tr>
    <td>Growndwater recharge</td>
    <td>1</td>
    <td>max</td>
  </tr>
  <tr>
    <td>Pop. Density</td>
    <td>0.5</td>
    <td>min</td>
  </tr>
  <tr>
    <td>Distance to cities</td>
    <td>0.5</td>
    <td>max</td>
  </tr>
  <tr>
    <td>Water (seasonal)</td>
    <td>0.2</td>
    <td>max</td>
  </tr>
  <tr>
    <td>Water (permanent)</td>
    <td>0.2</td>
    <td>min</td>
  </tr>
  <tr>
    <td>NDVI</td>
    <td>0.2</td>
    <td>max</td>
  </tr>
  <tr>
    <td>river</td>
    <td>0.1</td>
    <td>max</td>
  </tr>
  <tr>
    <td>lake</td>
    <td>0.1</td>
    <td>max</td>
  </tr>
</table>

</br>

### The Web App
<p align="justify">
</p>

</br>

### Future developments
<p align="justify">
  <ul>
    <li>Direct access to satellite analysis-ready data services (e.g. GSKY, Google Earth Engine) for a timely update of our service integrating user-adjusted data</li>
    <li>Inclusion of machine-/deep-learning technologies to refine the selection of potential groundwater</li>
    <li>Delivery of time-series on climate conditions associated to the potential groundwater sites detected by our algorithm to inform on wet/dry conditions</li>
    <li>Relate information on e.g. atmospheric polution provided through the Copernicus Atmosphere API to identify potentially contaminated aquifers</li>
    <li>Allow users to provide their own information on e.g. temperature / humidity / soil moisture from mini weather stations as a modeling co-variate</li>
  </ul>
</p>

</br>

### Out team
<p align="justify">
While we are all work on biodiversity at <a href="https://www.idiv.de/en">iDiv</a>, we are a multi-disciplinary team composed by members of different groups with very different academic and professional backgrounds. If you wish to know more about us and our research, have a look at our contact details below.
<ul>
  <li><a href="https://www.idiv.de/en/groups_and_people/employees/details/164.html">Christian Langer</a>, technical expert at the <a href="https://www.idiv.de/en/groups_and_people/core_groups/biodiversity_conservation/team.html">Biodiversity and Convervation group</a> (<a href="https://github.com/ChristianLanger">GitHub</a>)</li>
  <li><a href="https://www.idiv.de/en/groups_and_people/employees/details/1034.html">Ruben Remelgado</a>, technical expert at the <a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html">Macroecology and Society group</a> (<a href="https://github.com/RRemelgado">GitHub</a>)</li>
  <li><a href="https://www.idiv.de/en/groups_and_people/employees/details/985.html">Steffen Ehrmann</a>, Post-Doc at the <a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html">Macroecology and Society group</a> (<a href="https://github.com/EhrmannS">GitHub</a>)</li>
</p>

</br>
</br>

<p align="center">
<a href="https://geobon.org/"><img height="100" src="https://geobon.org/wp-content/uploads/2018/02/GEOBON_logo_versionlong_below_color-copy-300x108.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.idiv.de/en"><img height="100" src="https://www.idiv.de/fileadmin/content/Files_Public_Relations/Logos/iDivLogo-long-EN.jpg"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html"><img height="100" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/MaS_long.svg"></a>
</p>
