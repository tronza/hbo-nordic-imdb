# hbo-nordic-imdb
Enrich HBO Nordic movie/series listing with OMDb-data. Year, stars and votes.

# Browser support
- Chrome 48>=

# Setting up
- Open `https://raw.githubusercontent.com/tronza/hbo-nordic-imdb/master/imdb-hbo-nordic.js` and copy everything.
- Open `https://fi.hbonordic.com/movies/a-z` and open console `View -> Developer -> JavaScript Console`, paste and press enter.
- Scroll down the movie list to trigger the enricher.

# Known bugs
- OMDb API `http://www.omdbapi.com/` returns the first matching movie or series, it could be fixed by providing correct year.

# TODO:
- Browser plugin
