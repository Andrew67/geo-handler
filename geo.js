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
// geo.js: "geo:" URI parsing and converting library
"use strict";

/** Represents a location with various parameters */
function GeoLocation () {
    this.latitude = 0.0;
    this.longitude = 0.0;
    this.zoom = 0.0;
}
GeoLocation.fromUri = function (uri) { return GeoUri.parse(uri); };
GeoLocation.prototype.toOpenStreetMapUrl = function () { return GeoUri.toOpenStreetMapUrl(this); };

const GeoUri = {
    GEO_URI_PREFIX: 'geo:',
    LAT_LNG_SEPARATOR: ',',
    /** Supports both Android/deprecated ? and & separators and finalized ; separator */
    PARAMETER_SEPARATOR: /[?&;]/g,
    PARAMETER_VALUE_SEPARATOR: '=',

    /** Parses a URI of the form "geo:..." and returns a {@type GeoLocation} object */
    parse: function (uri) {
        if (!uri.startsWith(this.GEO_URI_PREFIX)) throw 'Not a "geo:" URI: ' + uri;

        // Assuming an example URI of "geo:17.65,-30.43?z=4.3"
        // Parse out "geo:" scheme
        uri = uri.replace(this.GEO_URI_PREFIX, '');

        // uri is now "17.65,-30.43?z=4.3"
        // Split out the coordinates from the parameters
        const [rawLatLng, ...rawParameters] = uri.split(this.PARAMETER_SEPARATOR);
        const [latitude, longitude] = rawLatLng.split(this.LAT_LNG_SEPARATOR).map(Number);

        // Split out parameters into a Map
        const parameters = new Map(
            rawParameters.map((rawParameter) =>
                rawParameter.split(this.PARAMETER_VALUE_SEPARATOR).map(decodeURIComponent))
        );

        // Set up and return GeoLocation object
        const geoLocation = new GeoLocation();
        geoLocation.latitude = latitude;
        geoLocation.longitude = longitude;
        if (parameters.has('z')) geoLocation.zoom = Number(parameters.get('z'));

        return geoLocation;
    },

    /** Takes a {@type GeoLocation} object and returns an OpenStreetMap URL */
    toOpenStreetMapUrl: function (geoLocation) {
        return 'https://www.openstreetmap.org/#map=' + Math.round(geoLocation.zoom) + '/' +
            geoLocation.latitude.toFixed(5) + '/' + geoLocation.longitude.toFixed(5);
    }
};
