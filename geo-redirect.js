/*! geo-handler | https://github.com/Andrew67/geo-handler */
/*
    Copyright (c) 2018 Andrés Cordero

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// geo-redirect.js: Uses geo.js to redirect to given maps website
"use strict";
// Extract geo URI from location hash
const geoUri = decodeURIComponent(location.hash.substr(1));
// Redirect to OpenStreetMap
location.href = GeoLocation.fromUri(geoUri).toOpenStreetMapUrl();
