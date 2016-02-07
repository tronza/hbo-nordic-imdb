/**
 * Configurations
 */

var DELETE_ENTRY_IF_NO_INFO = false;
var MIN_IMDB_RATING         = 1.0;
var MIN_IMDB_VOTES          = 1;

/**
 * Configurations end
 */

var enrichedTitles = [];

function findMovie(name, callback) {
    $.get('https://www.omdbapi.com/?t=' + name + '&y=&plot=short&r=json', callback);
};

function enrichSingleTitle(element) {
    var titleElement = element || $('.description > h1')[0];

    var imdbSpans = $($(titleElement).parent()).find('.imdb-rating')
    var imdbSpanCount = imdbSpans.length

    // If there'a already an imdb-element present, no need to enrich.
    if (imdbSpanCount > 0) {
        return;
    }

    var URIEncodedName = titleElement.innerHTML.replace(' ', '+')

    findMovie(URIEncodedName, function (data) {
        if (!data || !data.imdbRating) {
            if (DELETE_ENTRY_IF_NO_INFO) {
                $($(titleElement).parents('li')[0]).remove();
            }
            return;
        }

        if (parseFloat(data.imdbRating) <= MIN_IMDB_RATING || parseInt(data.imdbVotes.replace(',', '')) <= MIN_IMDB_VOTES) {
            $($(titleElement).parents('li')[0]).remove();
            return;
        }

        $imdbRating = $('<span>', {
            'class': 'imdb-rating',
            'style': 'color: yellow;'
        }).text(data.imdbRating + ' (' + data.imdbVotes + ' votes) ' + data.Year);

        $imdbRating.prepend($('<img>', {
            src: 'https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_46x22-2264473254._CB306318085_.png',
            alt: 'IMDb',
            style: 'width: 50px; padding-right: 10px;'
        }));

        var titleKey = data.Title + '_' + data.Year;

        // Sometimes it possible to get duplicates, try to mitigate the problem with a hack.
        if (enrichedTitles.indexOf(titleKey) === -1) {
            $($(titleElement).parent()).append($imdbRating);
            enrichedTitles.push(titleKey);
        }
    });
};

function enrichAllTitles() {
    var titleElements = $('.description > a > h2');

    if (titleElements.length === 0) {
        titleElements = $('.description > h2');
    }

    if (titleElements.length === 0) {
        titleElements = $('.description > h1');
    }

    titleElements.each(function (i, element) {
        enrichSingleTitle(element);
    });
};

// Copy-pasted from http://stackoverflow.com/questions/14866775/detect-document-height-change
function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight, newHeight;
    (function run() {
        newHeight = elm.clientHeight;
        if (lastHeight != newHeight)
            callback();
        lastHeight = newHeight;

        if (elm.onElementHeightChangeTimer)
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
};

onElementHeightChange(document.body, function () {
    enrichAllTitles();
});
