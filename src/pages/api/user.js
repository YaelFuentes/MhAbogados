import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  const mail = req.session.get("email");
  const status = req.session.get("status");
  const DNI = req.session.get("DNI")
  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      mail: mail ? mail: null,
      ...user,
      ...DNI,
      status: status ? status : ' '
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});