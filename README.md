# Geo URI Handler
Open `geo:` URIs in your preferred maps website

Supported destination map sites:
* Qwant Maps (default)
* OpenStreetMap
* Google Maps
* Bing Maps
* Apple Maps (macOS only)

Supported URI examples:
* `geo:latitude,longitude` - displays the given coordinates and places a marker at them
* `geo:latitude,longitude?z=zoom` - overrides the default zoom
* `geo:latitude,longitude;z=zoom` - same as above
* `geo:latitude,longitude?q=search+query` - performs the given search query around the given coordinates
  (a marker is not displayed for the coordinates)
* Combinations of `z` and `q` are allowed with either `?` and `&` (Android/unofficial) or `;` (official) delimiters

Ignored parameters:
* `crs` (always treated as wgs84)
* `u` (always ignored)
* `geo:latitude,longitude,altitude` (altitude is ignored)

Supported browsers:
* Firefox 68+
* Android already natively [partially supports `geo:` URIs](https://developer.android.com/guide/appendix/g-app-intents.html)
  * Support varies by app, and Firefox for Android passes the URI directly to the OS, so this extension is not compatible

Licenses:
* Code: MIT (see LICENSE file)
* Icon: [Globe](https://thenounproject.com/search/?q=globe&i=1368249) by
  [Randomhero](https://thenounproject.com/rahedesigns) from the [Noun Project](https://thenounproject.com/)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.