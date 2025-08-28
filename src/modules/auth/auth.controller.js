import { asyncHandler } from "../../shared/utlis/asyncHandler.js";
import { loginUser,logoutUser,signupUser} from "./auth.service.js";
import { clearAuthCookies, setAuthCookies } from "./token.service.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await loginUser(email, password);

setAuthCookies(res, accessToken, refreshToken);
  res.json({ accessToken, refreshToken, user });
});

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await signupUser({ name, email, password, role });

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });  
});


export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const userId = req.user?.id;

  const result = await logoutUser(userId, refreshToken);
clearAuthCookies(res);
  res.json(result);
});