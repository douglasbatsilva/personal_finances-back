class BaseRoute {
  renderByEnv(res, render, status) {
    const { page, notify } = render;
    if (process.env.NODE_ENV === "development") {
      return res.render(page, notify);
    }
    return res.status(status).json(status);
  }

  redirectByEnv(res, result, url) {
    const { status, message } = result;
    if (process.env.NODE_ENV === "development") {
      return res.redirect(url);
    }
    return res.status(status).json({ message });
  }
}

module.exports = new BaseRoute();
