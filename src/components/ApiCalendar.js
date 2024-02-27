import ApiCalendar from "react-google-calendar-api";

const config = {
  apiKey: "AIzaSyA6HgHMk8QqahHViE5uiNc3KmUmMoR3Z3A",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);