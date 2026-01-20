import Booking from "../model/Booking.js";
import Movie from "../model/Movie.js";
import { clerkClient } from "@clerk/express";

const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;
    const bookings = await Booking.find({ user: user })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      bookings,
      message: "Bookings fetch Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateFavourite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favourites) {
      user.privateMetadata.favourites = [];
    }

    if (!!user.privateMetadata.favourites.includes(movieId)) {
      user.privateMetadata.favourites.push(movieId);
    } else {
      user.privateMetadata.favourites = user.privateMetadata.favourites.filter(
        (item) => item !== movieId,
      );
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    return res.json({
      success: true,
      message: "favourite movies updated",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getFavourites = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);
    const favourites = user.privateMetadata.favourites;

    const movies = await Movie.find({_id: {$in : favourites}});

    return res.json({
        success: true,
        movies,
    })

  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getUserBookings, updateFavourite, getFavourites };
