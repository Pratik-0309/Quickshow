import Show from "../model/Shows.js";
import Movie from "../model/Movie.js";
import axios from "axios";

const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      },
    );

    const movies = data.results;
    return res.status(200).json({
      success: true,
      movies,
      message: "Movies fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
         axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        })
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts:movieCreditsData.cast.slice(0, 15),
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      }
      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];
    showsInput.forEach(show => {
        const showDate = show.date;
        show.time.forEach((time)=>{
            const dateTimeString = `${showDate}T${time}:00`;
            showsToCreate.push({
                movie: movieId,
                ShowDateTime: new Date(dateTimeString),
                showPrice: Number(showPrice),
                occupiedSeats: new Map()
            })
        })
    });

    if(showsToCreate.length > 0){
        await Show.insertMany(showsToCreate);
    }

    return res.status(200).json({
        success: true,
        message: "Show Added Successfully",
        showsToCreate,
    })
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getShows = async (req,res) => {
  try {

    const shows = await Show.find({})
    .populate('movie').sort({ShowDateTime: 1});

    if(!shows){
      return res.json({
        success: false,
        message: "Show not available"
      })
    }

    return res.status(200).json({
      success: true,
      shows: shows,
      message: "Show fetch SuccessFully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed To Fetch Shows"
    })
  }
}

const getShow = async (req,res) => {
  try {
    const {movieId} = req.params;
    const shows = await Show.find({movie: movieId, ShowDateTime: {$gte: new Date()}})

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show)=> {
      const date = show.ShowDateTime.toISOString().split("T")[0];
      if(!dateTime[date]){
        dateTime[date] = [];
      }
      dateTime[date].push({time: show.ShowDateTime, showId: show._id})
    })

    return res.status(200).json({
      success: true,
      movie,
      dateTime,
      message: "Show fetch Successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed To fetch Show"
    })
  }
}

export { getNowPlayingMovies, addShow, getShows,getShow };
