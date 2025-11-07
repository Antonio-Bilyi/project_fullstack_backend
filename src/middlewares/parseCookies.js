export default function parseCookies(req, res, next) {
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) {
    req.cookies = {};
    return next();
  }

  const parsed = {};

  cookieHeader.split(';').forEach((pair) => {
    const indexOfEq = pair.indexOf('=');
    if (indexOfEq === -1) {
      return;
    }
    const key = decodeURIComponent(pair.slice(0, indexOfEq).trim());
    const value = decodeURIComponent(pair.slice(indexOfEq + 1).trim());
    parsed[key] = value;
  });

  req.cookies = parsed;
  next();
}
