## GEO Hackathon 2019 Challenge 6: Detecting Ground Water Point Bore Wells

<img src="https://www.earthobservations.org/documents/geo16/hackathon_banner_m.jpg">

### Description
<p align="justify">
Welcome to our gitLab project! It describes the contribution of the <a href="https://www.idiv.de/en">German Centre for Integrative Biodiversity Research (iDiv)</a> to the <a href="https://www.earthobservations.org/geoweek19.php?t=hackathon_about">GEO Week 2019 Hackathon</a> where we spent two (very intensive) days developing a web application to inform on potentially locations to install bores in Thailand. Given the large spatial extent of our study region, we did not upload the remote sensing variables used in this exercise. However, we uploaded our folder structure along with our outputs and the underlying code.
</p>

</br>

### Background
<p align="justify">
In regions such as Thailand and its neighboring countries, where food production is contingent on intensive, water dependent agriculture, the drainage of groundwater for irrigation contributes to the lowering of water tables, compromising its long-term use. This contributes to negative side effects, such as salinity, stream depletion and land subsidence, which hinder agricultural productivity putting food security - and environmental sustainability - at grave risk. In this context, the detection of groundwater storage - which we can explore though bore holes - is an essential step to optimize water utilization. This knowledge can lead farmers towards precision agriculture and avoid a waste of resources, as well as its depletion within threaten aquifers. The use of field-level weather stations can further support spatial data on groundwater. Such stations offer information on biophysical parameters such as temperature, humidity, soil moisture and particular matter, and can help to refine the mapping and monitoring of groundwater. This effectively empowers the farmers, turning them into active contributors of environmental monitoring.
</p>

</br>

<p align="center"><img width=600 height=300 src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/studySite.png"></p>

<p align="center"><caption>Study site location</caption></p>

</br>

### Process
<p align="justify">
Nowadays, open-access satellite sensors are abundant and the development of high-performance computing platforms has led to an era of intensive data production. In this context, the challenge of the remote sensing community is shifting from the development of new metrics to the ability to integrate an insane multitude of data products into a meaningful - and useful - representation of the world that can serve practical applications such as the challenge at hand.
</p>

<table style="border: 1px solid transparent">
<th><p align="center"><img height="400" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/coding_small.jpg">
<th><p align="center"><img height="400" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/sugar_small.jpg"></p></th>
</table>

<p align="justify">
In this exercise, we integrated different products on biophysical conditions (i.e. climate, soil, water balance, surface water) to detect locations with potential groundwater deposits that are suitable for the installation of bores, an essential practice in rural development. Moreover, our work depended on state-of-the-art socio-economic variables, such as population density and distance to the nearest city, variables that are deeply dependent on a variety of complex remote sensing products (e.g. urban areas, building height). When accessing underground aquifers, elements such as pollution originating from densely populated areas can contribute for the contamination of water deposits, making such layers highly relevant.
</p>

</br>

<table style="margin:0px auto; width:500px">
  <tr>
    <th width="200" align="center">Dataset</th>
    <th width="300" align="center">Source</th>
    <th width="400" align="center">Variable</th>
    <th width="300" align="center">Access</th>
  </tr>
  <tr>
    <td width="200" align="center" rowspan=2>SoilGrids</td>
    <td width="300" align="center" rowspan=2>MODIS</td>
    <td width="400" align="center">Soil Depth</td>
    <td width="300" align="center" rowspan=2><a href="https://www.isric.org/explore/soilgrids">Webportal</a></td>
  </tr>
  <tr>
    <td width="300" align="center">Soil Porosity</td>
   </tr>
    <tr>
    <td width="300" align="center" rowspan=2>Global Surface Water</td>
    <td width="300" align="center" rowspan=2>Landsat</td>
    <td width="300" align="center" align="center">Permanent Water</td>
    <td width="300" align="center" rowspan=2><a href="https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_GlobalSurfaceWater">GEE API</a></td>
  </tr>
  <tr>
    <td width="300" align="center">Seasonal water</td>
  </tr>
    <tr>
    <td width="300" align="center">GHS POP</td>
    <td width="300" align="center">Landsat</td>
    <td width="300" align="center">Population density</td>
    <td width="300" align="center"><a href="https://ghsl.jrc.ec.europa.eu/ghs_pop.php">Webportal</a></td>
  </tr>
    <tr>
    <td width="300" align="center">Travel Time</td>
    <td width="300" align="center">Landsat</td>
    <td width="300" align="center">Distance to cities > 50K Hab.</td>
    <td width="300" align="center"><a href="https://ec.europa.eu/jrc/en/news/how-far-nearest-city-global-map-travel-time-cities-published">Webportal</a></td>
  </tr>
  <tr>
    <td width="300" align="center">Surface Reflectances</td>
    <td width="300" align="center">Landsat</td>
    <td width="300" align="center">NDVI (max., median composite)</td>
    <td width="300" align="center"><a href="https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C01_T1_SR">GEE API</a></td>
  </tr>
  <tr>
    <td width="300" align="center">Precipitation</td>
    <td width="300" align="center" rowspan=3>TerraClimate</td>
    <td width="300" align="center" rowspan=3>Groundwater recharge</td>
    <td width="300" align="center" rowspan=3><a href="http://www.climatologylab.org/terraclimate.html">Webportal</a></td>
  </tr>
  <tr><td width="300" align="center">Evapotranspiration</td></tr>
  <tr><td width="300" align="center">Surface runoff</td></tr>
    <tr>
    <td width="300" align="center" rowspan=2>Global River Width</td>
    <td width="300" align="center" rowspan=2>Landsat</td>
    <td width="300" align="center">Distance to rivers</td>
    <td width="300" align="center" rowspan=2><a href="https://zenodo.org/record/1269595#.Xb5n99V7k2w">Webportal</a></td>
  </tr>                                                                                
  <tr>
    <td width="300" align="center">Distance to lakes</td>
  </tr>
  <tr>
    <td width="300" align="center">CCI</td>
    <td width="300" align="center">AVHRR/MERIT/etc</td>
    <td width="300" align="center">Land cover</td>
    <td width="300" align="center"><a href="https://maps.elie.ucl.ac.be/CCI/viewer/">Webportal</a></td>
  </tr>
</table>

<p align="center"><caption>Input variables and their corresponding sources</caption></p>

</br>


</br>

<p align="justify">
We collected all of these variables using a series of open-access data portals (e.g. Google Earth Engine, Copernicus, CCI) over Thailand and its neighboring countries at a resolution of 300 m. Then, we combined them in a multi-variate scoring model where each variable receives a weight after scaling representing its importance in the model, seen in the table below. The importance field describes how each variable contributed to the model. When "max", the highest values in the variable are most important. E.g., the presence of seasonal water (set to "max") can help us detect temporary standing water that might have infiltrated underground. However, in pixels covered by with permanent water (set to "min"), likely related to rivers, the installation of bores is not feasible.
</p>
<p align="justify">
The final layer was then queried with well samples collected with Open Street Map (OSM) to determine an optimal threshold for selecting groundwater deposits and then converted the selected pixels to a vector that was fed to our webapp, together with information on e.g. land cover, precipitation and temperature for the selected sites.
</p>

</br>

<table style="margin:0px auto; width:500px">
  <tr>
    <th width="300" align="center">Variable</th>
    <th width="300" align="center">Units</th>
    <th width="300" align="center">Weight</th>
    <th width="300" align="center">Importance</th>
  </tr>
  <tr>
    <td align="center">Soil Depth (cm)</td>
    <td align="center">cm</td>
    <td align="center">1</td>
    <td align="center">max</td>
  </tr>
  <tr>
    <td align="center">Slope</td>
    <td align="center">degrees</td>
    <td align="center">1</td>
    <td align="center">min</td>
  </tr>
  <tr>
    <td align="center">Soil Porosity</td>
    <td align="center">g/cm3</td>
    <td align="center">1</td>
    <td align="center">min</td>
  </tr>
  <tr>
    <td align="center">Growndwater recharge (mm)</td>
    <td align="center">mm</td>
    <td align="center">1</td>
    <td align="center">max</td>
  </tr>
  <tr>
    <td align="center">Population Density</td>
    <td align="center">Habitats/km2</td>
    <td align="center">0.5</td>
    <td align="center">min</td>
  </tr>
  <tr>
    <td align="center">istance cities > 50K Hab.</td>
    <td align="center">Days</td>
    <td align="center">0.5</td>
    <td align="center">max</td>
  </tr>
  <tr>
    <td align="center">Seasonal surface water</td>
    <td align="center">%</td>
    <td align="center">0.2</td>
    <td align="center">max</td>
  </tr>
  <tr>
    <td align="center"> % Permanent surface water</td>
    <td align="center">%</td>
    <td align="center">0.2</td>
    <td align="center">min</td>
  </tr>
  <tr>
    <td align="center">NDVI</td>
    <td align="center">Unitless</td>
    <td align="center">0.2</td>
    <td align="center">max</td>
  </tr>
  <tr>
    <td align="center">Distance to rivers</td>
    <td align="center">Meters</td>
    <td align="center">0.1</td>
    <td align="center">max</td>
  </tr>
  <tr>
    <td align="center">Distance to lakes</td>
    <td align="center">Meters</td>
    <td align="center">0.1</td>
    <td align="center">max</td>
  </tr>
</table>

</br>

<p align="center"><caption>Variables used and their corresponding influence in the scoring model</caption></p>

### The Ground Water Point Data Portal

</br>

<p align="center"><img src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/app-screenshot_1.png"></p>

<p align="center"><caption>Web app interface</caption></p>


</br>

<p align="justify">
We developed a "Ground water point portal", a full-working mobile-friendly web application to inform and detect potentially locations to install ground water bore wells in Thailand.</p>
<p align="justify">
Video of the data portal: https://www.youtube.com/watch?v=F0Gr4_sou7k
</p>
A heatmap gives the user an insight about potential locations. The user can search and filter for the potential points. Each location has information about the
<ul>
	<li>Name of the location</li>
	<li>Ground water probability</li>
	<li>Land cover</li>
	<li>Max Temperature</li>
	<li>Soil Depth</li>
	<li>Max Precipation</li>
</ul>
By adding another ground water point to the map the user can provide detailed information about the ground water probability incl. photos of the location and edit the geographical location.
</p>

<table style="border: 1px solid transparent">
<th><p align="center"><img width="80%" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/app-screenshot_2.jpg">
<th><p align="center"><img width="80%" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/app-screenshot_3.jpg"></p></th>
</table>

</br>

<p align="center"><img src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/app-screenshot_4.png"></p>

<p align="center"><caption>User-prompted update to the point database</caption></p>

</br>

#### Components

<p align="justify">
The portal is Javascript full-stack web application.<br>
Backend components:
<ul>
<li><a href="https://nodejs.org/en">nodejs</a></li>
<li><a href="https://www.mongodb.com">MongoDB</a></li>
</ul>
Frontend components:
<ul>
<li><a href="http://getbootstrap.com/">Bootstrap</a></li>
<li><a href="http://leafletjs.com/">Leafletjs</a></li>
<li><a href="http://twitter.github.io/typeahead.js/">typeahead</a></li>
<li><a href="https://jquery.com/">jQuery</a></li>
<li><a href="http://listjs.com/">list.js</a></li>
</ul>
</p>

#### Installation
The `package.json` includes all dependencies to install. Make sure you have MongoDB running.

To run the web app just use `npm start`. Open your web browser and navigate to port 3000 on `http://localhost:3000`.

That´s it! You are now ready to use the Ground water point portal!

</br>

### Is it Scalable?
<p align="justify">
Short answer: Yes! We wrote the algorithm behind the final product in Python and made it dependent on purely open-source modules. Moreover, we designed the underlying scripts as modular, command line applications that are compatible highly concurrent (or parallelized) computation system. When dealing with larger areas, we can easily integrate our algorithm with a spatial tilling system to process large volumes of data. Moreover, while the scoring model integrates several variables, the script behind it is independent of this fact.  We can easily customize the set of input layers by editing a simple configuration file that provides information on the location of these variables as well as their weight in the final model. The modular nature of our algorithm means we can easily replace its different components, allowing us to refine our product in the future without the need for time-consuming revisions of one-time scripts.
</p>

</br>

### Future developments
<p align="justify">
  <ul>
    <li>Direct access to satellite analysis-ready data services (e.g. GSKY, Google Earth Engine) for a timely update of our service integrating user-adjusted data</li>
    <li>Inclusion of machine-/deep-learning technologies to refine the selection of potential groundwater</li>
    <li>Delivery of time-series on climate conditions associated to the potential groundwater sites detected by our algorithm to inform on wet/dry conditions</li>
    <li>Relate information on e.g. atmospheric polution provided through the Copernicus Atmosphere API to identify potentially contaminated aquifers</li>
    <li>Allow users to provide their own information on e.g. temperature / humidity / soil moisture from mini weather stations as a modeling co-variate to interactively improve our mapping given an active voice to farmers during the scientific process</li>
  </ul>
</p>

</br>

### Out team
<p align="justify">
While we are all work on biodiversity at <a href="https://www.idiv.de/en">iDiv</a>, we are a multi-disciplinary team composed by members of different groups with very different academic and professional backgrounds. If you wish to know more about our research and us, have a look at our contact details below.
<ul>
  <li><a href="https://www.idiv.de/en/groups_and_people/employees/details/164.html">Christian Langer</a>, technical expert at the <a href="https://www.idiv.de/en/groups_and_people/core_groups/biodiversity_conservation/team.html">Biodiversity and Convervation group</a> (<a href="https://github.com/ChristianLanger">GitHub</a>)</li>
  <li><a href="https://www.idiv.de/en/groups_and_people/employees/details/1034.html">Ruben Remelgado</a>, technical expert at the <a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html">Macroecology and Society group</a> (<a href="https://github.com/RRemelgado">GitHub</a>)</li>
  <li><a href="https://www.idiv.de/en/groups_and_people/employees/details/985.html">Steffen Ehrmann</a>, Post-Doc at the <a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html">Macroecology and Society group</a> (<a href="https://github.com/EhrmannS">GitHub</a>)</li>
</p>


<p align="center"><img width=600 src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/iDiv_groupphoto_small.jpg"></p>

</br>
</br>

<p align="center">
<a href="https://geobon.org/"><img height="100" src="https://geobon.org/wp-content/uploads/2018/02/GEOBON_logo_versionlong_below_color-copy-300x108.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.idiv.de/en"><img height="100" src="https://www.idiv.de/fileadmin/content/Files_Public_Relations/Logos/iDivLogo-long-EN.jpg"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.idiv.de/en/groups_and_people/core_groups/macroecosocial.html"><img height="100" src="https://github.com/RRemelgado/GEO_Hackaton_2019/blob/master/figures/MaS_long.svg"></a>
</p>
