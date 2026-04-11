import jwt from "jsonwebtoken"
const genrateToken = (id) => {
    return jwt.sign({ id }, "mysecretkey", {
        expiresIn: "7d",
    })
}

export default genrateToken;
