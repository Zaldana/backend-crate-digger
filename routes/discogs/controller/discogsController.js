require("dotenv").config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

async function getAlbum(req, res) {

    let album = req.params.album;
    const album_url = `https://api.discogs.com/database/search?q=${album}&format=Vinyl&page=1&per_page=100&key=${CONSUMER_KEY}&secret=${CONSUMER_SECRET}`;
    const albumResult = await fetch(album_url, {
        headers: { 'User-Agent': 'CrateDigger/0.1' }
    });
    const albumResponse = await albumResult.json();

    res.json(albumResponse)

};

async function getArtist(req, res) {

    let artist = req.params.artist;
    const artist_url = `https://api.discogs.com/database/search?type=artist&q=${artist}&key=${CONSUMER_KEY}&secret=${CONSUMER_SECRET}`;
    const artistResult = await fetch(artist_url, {
        headers: { 'User-Agent': 'CrateDigger/0.1' }
    });
    const artistResponse = await artistResult.json();

    res.json(artistResponse)

};

async function getArtistDetails(req, res) {

    let artistDetails = req.params.artistDetails;
    const artist_details_url = `https://api.discogs.com/database/search?format=Vinyl&artist=${artistDetails}&page=1&per_page=100&key=${CONSUMER_KEY}&secret=${CONSUMER_SECRET}`;
    const artistReleasesResult = await fetch(artist_details_url, {
        headers: { 'User-Agent': 'CrateDigger/0.1' }
    });
    const artistReleasesResponse = await artistReleasesResult.json();

    res.json(artistReleasesResponse)

};

module.exports = {
    getAlbum,
    getArtist,
    getArtistDetails
}