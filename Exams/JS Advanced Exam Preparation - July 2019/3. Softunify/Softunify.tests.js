const SoftUniFy = require("./03. Softunify_Ресурси");
const expect = require("chai").expect;

describe("testing SoftUniFy", function() {
    let softUniFy;
    beforeEach(function () {
        softUniFy = new SoftUniFy();
    });

    describe("testing presence of properties", function() {
        it("has allSongs", function() {
            let actual = softUniFy.hasOwnProperty("allSongs");

        expect(actual).to.be.true;
        });
    });
    const ARTIST = "Ivan";
    const SONG = "Hello";
    const LYRICS = "Hi my name is";
    
    describe("testing downloadSong()", function() {
        const EXPECTED_ADD_SONG_RESULT = `${SONG} - ${LYRICS}`;
        it("should add song to allSongs property", function() {
            softUniFy.downloadSong(ARTIST, SONG, LYRICS);
            let actual = softUniFy["allSongs"][ARTIST]["songs"][0];

            expect(actual).to.equal(EXPECTED_ADD_SONG_RESULT);
        });

    });

    describe("testing playSong()", function() {
        const EXPECTED_NOT_FOUND_RESULT = `You have not downloaded a ${SONG} song yet. Use SoftUniFy's function downloadSong() to change that!`;
        const EXPECTED_FOUND_RESULT = `${ARTIST}:\n${SONG} - ${LYRICS}\n`;

        it("should return correct not found message when searched for song does not exist", function() {
            let actual = softUniFy.playSong(SONG);

            expect(actual).to.equal(EXPECTED_NOT_FOUND_RESULT);
        });

        it("should return correct artist and song", function() {
            softUniFy.downloadSong(ARTIST, SONG, LYRICS);
            let actual = softUniFy.playSong(SONG);

            expect(actual).to.equal(EXPECTED_FOUND_RESULT);
        });
    });

    const TEST_ARTIST = "BNR";
    const TEST_SONG = "SS";
    const TEST_LYRICS = "asddd";

    describe("testing songsList accessor", function() {
        const EXPECTED_EMPTY_LIST_RESULT = `Your song list is empty`;
        const EXPECTED_ADDED_SONGS_RESULT = `${SONG} - ${LYRICS}\n${TEST_SONG} - ${TEST_LYRICS}`;

        it("should return correct message when no songs downloaded", function() {
            let actual = softUniFy.songsList;

            expect(actual).to.equal(EXPECTED_EMPTY_LIST_RESULT);
        });

        it("should return correct list of songs", function() {
            softUniFy.downloadSong(ARTIST, SONG, LYRICS);
            softUniFy.downloadSong(TEST_ARTIST, TEST_SONG, TEST_LYRICS);
            let actual = softUniFy.songsList;

            expect(actual).to.equal(EXPECTED_ADDED_SONGS_RESULT);
        })
    });

    describe("testing rateArtist()", function() {
            const ARTIST_NOT_FOUND = `The ${ARTIST} is not on your artist list.`;
            const FIRST_RATING = 50;
            const SECOND_RATING = 33;
            const EXPECTED_AVERAGE_RATING = 41.5;

            it("should return correctMessage when artist not found", function() {
                let actual = softUniFy.rateArtist(ARTIST);

                expect(actual).to.equal(ARTIST_NOT_FOUND);
            });

            it("????????", function() {
                softUniFy.downloadSong(ARTIST, SONG, LYRICS);
                let actual = softUniFy.rateArtist(ARTIST);

                expect(actual).to.equal(0);
            });

            describe("testing average rating", function() {
                it("should return correct value with 1 rate applied", function() {
                    softUniFy.downloadSong(ARTIST, SONG, LYRICS);
                    let actual = softUniFy.rateArtist(ARTIST, FIRST_RATING);

                    expect(actual).to.equal(FIRST_RATING);
                });

                it("should return correct value with several ratings applied", function() {
                    softUniFy.downloadSong(ARTIST, SONG, LYRICS);
                    softUniFy.rateArtist(ARTIST, FIRST_RATING);
                    let actual = softUniFy.rateArtist(ARTIST, SECOND_RATING);

                    expect(actual).to.equal(EXPECTED_AVERAGE_RATING);
                })
            })



        });
});