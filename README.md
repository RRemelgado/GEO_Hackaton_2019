## GEO Hackaton 2019 Challenge 6: Detecting Ground Water Point Bore Wells

### Description
Welcome to our gitLab project! It compiles the contribution of the <a href="https://www.idiv.de/en">German Centre for Integrative Biodiversity Research (iDiv)</a> to <a href="https://www.earthobservations.org/geoweek19.php?t=hackathon_about">the GEO Week 2019 Hackaton</a> where we spent two (very intensive) days developing a web application to inform on potentiatly suitable locations to install bores in Thailand.

</br>

### Background
<p align="justify">
"Main problems we considering are ground water. Intensive use of groundwater for irrigation leads to the lowering of water tables, reducing its potential for future use. It also generates multiple negative externalities, including salinity, stream depletion, or land subsidence that directly affect agricultural productivity, water users and the environment. So, what we are doing was detecting precise ground water points for installing bore wells. This leads to precision agriculture and also it helps in not wasting resources. On the other hand, we are arranging a mini weather station which helps in detecting Temperature, humidity, soil moisture and pm values in advance. This will help in effective use of water and pm values will help in detecting the density in crop. Main users for our project are farmers and our project will help farmers. By solving these issues, we can create huge impact on agriculture development in future, because these issues lead the farmer contact directly with producer without any expert interference in the fields."
</p>

</br>

### Process
<p align="justify">
Nowadays, open-access satellite sensors are abundant and the development of high-performance computing platforms has lead to an era of intensive data production. In this context, the challenge of the remote sensing community is shiftting from the development of new metrics to the ability to integrate an insane multitude of data products into a meaningful - and useful - representation of the world that can serve practical applications such as the challenge at hand.
</p>
<p align="justify">
In this exercie, we integrated different products on biophysical conditons (i.e. climate, soil, water balance, surface water) to detect locations with potential groundwater deposits that are suitable for the instalation of bores, an essential practice in rural development. Moreover, our work dependended on state-of-the-art socio-economic variables, such as population density and distance to the nearest city, variables that are deeply dependent on a variety of complex remote sensing products (e.g. urban areas, building height). When accessing underground aquifers, elements such as polution originating from densely populated areas can contribute for the contamination of water deposits, making such layers highly relevant.
</p>
<p align="justify">
We collected all of these variables using a series of open-access data portals (e.g. Google Earth Engile, Copernicus, CCI) over Thailand and its neighboring coutries at a resolution of 300 m. Then, we combined them in a multi-variate scoring model where each variable receives a weight after scaling representing its importance in the model, seen in the table below. The importance field represents which values are highlighted. When "max", the highest values in the variable are most important. The presence example Seasonal water (set to "max") can help us detect pixels where water can have infitrated into the underground and where the instalation of bores is possible. However, pixels with permanent water (set to "min") are likely covered by e.g. rivers where the instalation of bores is not feasible. 
</p>
<p align="justify">
The final layer was then queried with Open Street Map (OSM) data on wells to determine an optimal threshold for selecting groundwater deposits and then converted the selected pixels to a vector that was fed to our webapp, together with information on e.g. land cover, precipitation and temperature for the selected sites. The develoepd algorithms were developed in python and depend on purely open-source modules. The resulting functions were written as command line applications and can be used sequentially to automatically generate an updated version of our product.
</p>

</br>

| Variable             | Weight | Importance |
|----------------------|--------|------------|
| Soil Depth           | 1      | max        |
| Slope                | 1      | min        |
| Soil Porosity        | 1      | min        |
| Growndwater recharge | 1      | max        |
| Pop. Density         | 0.5    | min        |
| Distance to cities   | 0.5    | max        |
| Water (seasonal)     | 0.2    | max        |
| Water (permanent)    | 0.2    | min        |
| NDVI                 | 0.2    | max        |
| river                | 0.1    | max        |
| lake                 | 0.1    | max        |

</br>

### The Web App
<p align="justify">

</p>

</br>

### Future developments
* Direct access to satellite analysis-ready data services (e.g. GSKY, Google Earth Engine) for a timely update of our service integrating user-adjusted data
* Inclusion of machine-/deep-learning technologies to refine the selection of potential groundwater
* Delivery of time-series on climate conditions associated to the potential groundwater sites detected by our algorithm to inform on wet/dry conditions
* Relate information on e.g. atmospheric polution provided through the Copernicus Atmosphere API to identify potentially contaminated aquifers
* Allow users to provide their own information on e.g. temperature / humidity / soil moisture from mini weather stations as a modeling co-variate

</br>

<p align="center">
<a href="https://www.earthobservations.org/geoweek19.php?t=hackathon_about"><img width="160" height="65" src="https://www.earthobservations.org/images/page-graphics/top_banner_main_l_new.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://geobon.org/"><img width="75" height="75" src="https://geobon.org/wp-content/uploads/2018/09/cropped-site-icon.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.idiv.de/en"><img width="160" height="65" src="https://www.idiv.de/fileadmin/templates/images/logo.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html"><img width="160" height="110" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/MaS_long.svg"></a>
</p>
