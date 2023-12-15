import CommentDisplay from "../../pages/user/Comments";
import UserLogin from "../../pages/user/Login";
import RegisterAccount from "../../pages/user/Register";
import SearchPage from "../../pages/user/Search";
import AddSubmission from "../../pages/user/AddContent";
import MyComments from "../../pages/user/Comments";
import MySettings from "../../pages/user/Settings";
import NewComment from "../comments/NewComment";
import StoryViewer from "../StoryViewer";
import Protected from "../layout/Protected";
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
              <NewComment />
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
