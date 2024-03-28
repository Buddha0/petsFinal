export const getToken = (user, statusCode, res, message) => {
    try {
        const jwtToken = user.getJWTToken();
        const option = {
            expires: new Date(
                Date.now() + (process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
            ),
            httpOnly: true
        }
        res.status(statusCode).cookie("token", jwtToken, option).json({
            success: true,
            user,
            message,
            jwtToken
        })
    } catch (error) {
        console.error("Error generating JWT token:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
