import Booking from "../model/Booking.js";
import Show from "../model/Shows.js";
import User from "../model/User.js";

const isAdmin = async (req, res) => {
  res.json({
    success: true,
    isAdmin: true,
  });
};

const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      ShowDateTime: { $gte: new Date() },
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc.booking.amount, 0),
      activeShows,
      totalUser,
    };

    return res.json({
      success: true,
      dashboardData,
      message: "Dashboard data fetch successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ ShowDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ ShowDateTime: 1 });

    return res.json({
      success: true,
      shows,
      message: "Shows fetch Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({}).populate('user').populate({
        path: "show",
        populate: {path: "movie"}
    }).sort({createdAt: -1})

    return res.json({
        success: true,
        bookings,
        message: "Bookings fetch Successfully"
    })

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { isAdmin, getDashboardData, getAllShows, getAllBookings };
