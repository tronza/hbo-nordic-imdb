# hbo-nordic-imdb
Enrich HBO Nordic movie/series listing with OMDb-data. Year, stars and votes.

# Browser support (on OS X at least)
- Chrome 49+
- Mozilla Firefox 45+

# Using
- Open [bookmarklet.js](https://raw.githubusercontent.com/tronza/hbo-nordic-imdb/master/bookmarklet.js) and copy the minified JavaScript snippet
- Create a bookmark and insert minified JavaScript into its URL, name it like "HBO Nordic Ratings" or something.
- Click the bookmark while browsing HBO Nordic, it should work during the session.

# Setting up (for development)
- Open JavaScript [imdb-hbo-nordic.js](https://raw.githubusercontent.com/tronza/hbo-nordic-imdb/master/imdb-hbo-nordic.js) and copy everything.
- Open [HBO Nordic](https://fi.hbonordic.com/movies/a-z) and open console `View -> Developer -> JavaScript Console`, paste and press enter.
- Scroll down the movie list to trigger the enricher.

# Known bugs
- OMDb API `http://www.omdbapi.com/` returns the first matching movie or series, it could be fixed by providing correct year.

# TODO:
- Browser plugins for Chrome and Firefox
