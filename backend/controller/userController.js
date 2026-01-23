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

    let currentFavourites = user.privateMetadata.favourites || [];

    let updatedFavourites;
    if (currentFavourites.includes(movieId)) {
      updatedFavourites = currentFavourites.filter((id) => id !== movieId);
    } else {
      updatedFavourites = [...currentFavourites, movieId];
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        favourites: updatedFavourites,
      },
    });

    return res.json({
      success: true,
      message: updatedFavourites.includes(movieId) ? "Added to favourites" : "Removed from favourites",
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
    const favourites = user.privateMetadata.favourites || [];

    const favouriteIds = favourites.map(id => String(id));

    const movies = await Movie.find({ _id: { $in: favouriteIds } });

    return res.json({
      success: true,
      movies,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getUserBookings, updateFavourite, getFavourites };
