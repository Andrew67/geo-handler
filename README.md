# Geo URI Handler
Open `geo:` URIs in your preferred maps website

Supported browsers:
* Firefox 59+ (desktop)
* Android natively [partially supports `geo:` URIs](https://developer.android.com/guide/appendix/g-app-intents.html)

Supported URIs:
* `geo:latitude,longitude`
* `geo:latitude,longitude?z=zoom`
* `geo:latitude,longitude;z=zoom`
* `geo:latitude,longitude?q=search+query` (planned)
* `geo:latitude,longitude;q=search+query` (planned)
* Combinations of `z` and `q` are allowed with either `?` and `&` or `;` delimiters

Ignored parameters:
* `crs` (always treated as wgs84)
* `u` (always ignored)
* `geo:latitude,longitude,altitude` (URIs with this 3rd parameter present are still accepted, but altitude is ignored)

Supported destination map sites:
* OpenStreetMap
* Google Maps (planned)
* Bing Maps (planned)

Licenses:
* Code: MIT (see LICENSE file)
* Icon: [Globe](https://thenounproject.com/search/?q=globe&i=1368249) by [Randomhero](https://thenounproject.com/rahedesigns) from the [Noun Project](https://thenounproject.com/)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.