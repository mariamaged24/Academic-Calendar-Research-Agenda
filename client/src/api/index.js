import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

//users
export const createUser = (payload) => api.post(`/user/createuser`, payload);
export const loginUser = (payload) => api.post(`/user/loginuser`, payload);
export const getUserById = (id) => api.get(`/user/getuser/${id}`);
export const getAllUsers = () => api.get(`/user/getallusers`);
export const checkEmail = (payload) => api.post(`user/checkemail`, payload);
export const updateUser = (id, payload) => api.put(`/user/userupdate/${id}`, payload,  {
  headers: { "x-access-token": localStorage.getItem("token") },});
export const changePassword = (id, payload) =>
  api.put(`/user/passwordchange/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") },});
export const getFollowing = (id) =>
  api.get(`/user/getfollowing/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") },});
export const getFollowers = (id) =>
  api.get(`/user/getfollowers/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") },});
export const followUser = (id, payload) =>
  api.put(`/user/followuser/${id}`, payload,  {
    headers: { "x-access-token": localStorage.getItem("token") }} );
export const unfollowUser = (id, payload) =>
  api.put(`/user/unfollowuser/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }} );
export const followingQuestions = (id) =>
  api.get(`/user//getfollowingquestions/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const followingResearches = (id) =>
  api.get(`/user//getfollowingresearch/${id}`, {
      headers: { "x-access-token": localStorage.getItem("token") }})
export const addScheduledTask =  (id, payload) =>
  api.put(`/user/scheduledtasks/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const updateNewTasks =  (id, payload) =>
  api.put(`/user/updatetasks/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const removeOverlap =  (id, payload) =>
  api.put(`/user/removeoverlap/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
    
//questions
export const getUserQuestions = (id) => api.get(`/question/getquestions/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }});
export const deleteQuestion = (id) => api.delete(`/question/deletequestion/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const updateQuestion = (id,payload) => api.put(`/question/updatequestion/${id}`, payload,  {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const createQuestion = (payload) => api.post(`/question/createquestion`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const getAllQuestions =() => api.get(`/question/getallquestions`)


//researches
export const getUserResearches = (id) => api.get(`/research/getresearches/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }});
export const deleteResearch = (id) => api.delete(`/research/deleteresearch/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const updateResearch = (id,payload) => api.put(`/research/updateresearch/${id}`, payload,  {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const createResearch = (payload) => api.post(`/research/createresearch`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const getAllResearches =() => api.get(`/research/getallresearches`)


//reactions
export const createReaction = (payload) => api.post(`/reaction/createreaction`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const updateReaction = (id, payload) => api.put(`/reaction/updatereaction/${id}`, payload,  {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const isHelpful = (id, payload) => api.put(`/reaction/helpful/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const isNotHelpful = (id, payload) => api.put(`/reaction/nothelpful/${id}`, payload, {
    headers: { "x-access-token": localStorage.getItem("token") }})
export const deleteReaction = (id) => api.delete(`/reaction/deletereaction/${id}`, {
    headers: { "x-access-token": localStorage.getItem("token") }})




const apis = {
  createUser,
  loginUser,
  changePassword,
  getUserById,
  checkEmail,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  followingQuestions,
  followingResearches,
  updateNewTasks,
  addScheduledTask,
  getAllUsers,
  updateUser,
  removeOverlap,

  getAllQuestions,
  getUserQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  
  getAllResearches,
  getUserResearches,
  deleteResearch,
  updateResearch,
  createResearch,


  createReaction,
  updateReaction,
  isHelpful,
  isNotHelpful,
  deleteReaction
};

export default apis;
