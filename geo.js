/*! geo-handler | https://github.com/Andrew67/geo-handler */
/*
    Copyright (c) 2018-2020 Andrés Cordero

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
    this.zoom = null;
    this.searchQuery = null;
}
GeoLocation.fromUri = function (uri) { return GeoUri.parse(uri); };
GeoLocation.prototype.toMapsUrl = function (provider) {
    switch(provider) {
        case 'osm':
            return GeoUri.toOpenStreetMapUrl(this);
        case 'qwant':
        default:
            return GeoUri.toQwantMapsUrl(this);
    }
};

const GeoUri = {
    GEO_URI_PREFIX: 'geo:',
    LAT_LNG_SEPARATOR: ',',
    DEFAULT_ZOOM: 12,
    /** Supports both Android/deprecated ? and & separators and finalized ; separator */
    PARAMETER_SEPARATOR: /[?&;]/g,
    PARAMETER_VALUE_SEPARATOR: '=',

    /** Parses a URI of the form "geo:..." and returns a {@type GeoLocation} object */
    parse: function (uri) {
        if (!uri.startsWith(this.GEO_URI_PREFIX)) throw 'Not a "geo:" URI: ' + uri;

        // Assuming an example URI of "geo:17.65,-30.43?z=4.3&q=local+business"
        // Strip out "geo:" scheme
        const uriContents = uri.substr(this.GEO_URI_PREFIX.length);

        // uri is now "17.65,-30.43?z=4.3&q=local+business"
        // Split out the coordinates from the parameters
        const [rawLatLng, ...rawParameters] = uriContents.split(this.PARAMETER_SEPARATOR);

        // rawLatLng is "17.65,-30.43", rawParameters is ["z=4.3", "q=local+business"]
        const [latitude, longitude] = rawLatLng.split(this.LAT_LNG_SEPARATOR).map(Number);

        // Generate a key/value array for each parameter (initializes map), while decoding components (incl. +)
        // For our example URI, looks like: {"z": "4.3", "q": "local business"}
        const parameters = new Map(
            rawParameters.map((rawParameter) =>
                rawParameter.split(this.PARAMETER_VALUE_SEPARATOR) // "q=local+business" => ["q", "local+business"]
                    .map((s) => s.replace(/\+/g, '%20')) // ["q", "local+business"] => ["q", "local%20business"]
                    .map(decodeURIComponent)) // ["q", "local%20business"] => ["q", "local business"]
        );

        // Set up and return GeoLocation object
        const geoLocation = new GeoLocation();
        geoLocation.latitude = latitude;
        geoLocation.longitude = longitude;
        if (parameters.has('z')) geoLocation.zoom = Number(parameters.get('z'));
        if (parameters.has('q')) geoLocation.searchQuery = parameters.get('q');

        return geoLocation;
    },

    /** Takes a {@type GeoLocation} object and returns an OpenStreetMap URL */
    toOpenStreetMapUrl: function (geoLocation) {
        const latitude = geoLocation.latitude.toFixed(5),
            longitude = geoLocation.longitude.toFixed(5);
        return 'https://www.openstreetmap.org/' + // base URL
            (geoLocation.searchQuery !== null ? // search query
                'search?query=' + encodeURIComponent(geoLocation.searchQuery) :
                // if there is no search query, place a marker at the given location
                '?mlat=' + latitude + '&mlon=' + longitude) +
            '#map=' + // map location (lat,lng,zoom)
            (geoLocation.zoom !== null ? Math.round(geoLocation.zoom) : this.DEFAULT_ZOOM) + '/' +
            latitude + '/' + longitude;
    },

    /** Takes a {@type GeoLocation} object and returns a Qwant Maps URL */
    toQwantMapsUrl: function (geoLocation) {
        const latitude = geoLocation.latitude.toFixed(5),
            longitude = geoLocation.longitude.toFixed(5);
        return 'https://www.qwant.com/maps/' + // base URL
            (geoLocation.searchQuery !== null ? // search query
                'places/?q=' + encodeURIComponent(geoLocation.searchQuery) :
                // if there is no search query, place a marker at the given location
                'place/latlon:' + latitude + ':' + longitude) +
            '#map=' + // map location (lat,lng,zoom)
            (geoLocation.zoom !== null ? geoLocation.zoom.toFixed(2) : this.DEFAULT_ZOOM) + '/' +
            latitude + '/' + longitude;
    }
};
