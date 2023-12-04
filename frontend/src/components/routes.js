import CommentDisplay from "../pages/user/comments";
import UserLogin from "../pages/user/login";
import RegisterAccount from "../pages/user/register";
import SearchPage from "../pages/user/search";
import AddSubmission from "../pages/user/add_submission";
import AddComment from "../pages/user/add_comment";
import MyComments from "../pages/user/comments";
import MySettings from "../pages/user/settings";
import StoryViewer from "./story_viewer";
import Protected from "../components/protected";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function AppRoutes({ authState }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryViewer author="" />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/viewcomments" element={<CommentDisplay />} />
        <Route path="/register" element={<RegisterAccount />}></Route>
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/addsubmission"
          element={
            <Protected isLoggedIn={authState.userLoggedIn}>
              <AddSubmission />
            </Protected>
          }
        />
        <Route
          path="/addcomment"
          element={
            <Protected isLoggedIn={authState.userLoggedIn}>
              <AddComment />
            </Protected>
          }
        />

        <Route
          path="/mysettings"
          element={
            <Protected isLoggedIn={authState.userLoggedIn}>
              <MySettings />
            </Protected>
          }
        />
        <Route
          path="/mysubmissions"
          element={
            <Protected isLoggedIn={authState.userLoggedIn}>
              <StoryViewer author="stories/mystories" />
            </Protected>
          }
        />
        <Route
          path="/mycomments"
          element={
            <Protected isLoggedIn={authState.userLoggedIn}>
              <MyComments />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}
